import { generateSudoku } from "../features/sudoku/generator";
import { hasUniqueSolution } from "../features/sudoku/solver";
import { isBoardFull, isValidMove } from "../features/sudoku/validator";

console.log("Running Sudoku Logic Tests...");

const difficulties = ["Easy", "Medium", "Hard", "Expert"] as const;

let allPassed = true;

difficulties.forEach((diff) => {
  console.log(`\nTesting Difficulty: ${diff}`);
  const { initial, solved } = generateSudoku(diff);

  // 1. Check dimensions
  if (initial.length !== 9 || initial[0].length !== 9) {
    console.error("❌ Grid dimensions incorrect");
    allPassed = false;
  } else {
    console.log("✅ Dimensions 9x9 OK");
  }

  // 2. Check Valid Solved Grid
  if (!isBoardFull(solved)) {
    console.error("❌ Solved grid is not full");
    allPassed = false;
  } else {
    // Validate rules
    let valid = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = solved[r][c].value;
        // Temporarily remove to check validity of placement
        solved[r][c].value = null;
        if (!isValidMove(solved, r, c, val!)) {
          valid = false;
        }
        solved[r][c].value = val;
      }
    }
    if (valid) console.log("✅ Solved grid follows rules");
    else {
      console.error("❌ Solved grid violates rules");
      allPassed = false;
    }
  }

  // 3. Check Clue Count (approx)
  let clues = 0;
  initial.forEach((row) =>
    row.forEach((cell) => {
      if (cell.value !== null) clues++;
    }),
  );
  console.log(`ℹ️ Clues: ${clues}`);

  // 4. Check Uniqueness
  // Note: 'initial' has holes. Check if 'initial' has unique solution.
  if (hasUniqueSolution(initial)) {
    console.log("✅ Puzzle has unique solution");
  } else {
    console.error("❌ Puzzle has multiple or no solutions");
    allPassed = false;
  }
});

if (allPassed) {
  console.log("\n🎉 ALL TESTS PASSED");
  process.exit(0);
} else {
  console.error("\n💥 SOME TESTS FAILED");
  process.exit(1);
}
