// ====== Questions ======
const baseChallenges = [
  {q:"int[] nums = _____ int[5];", a:"new", h:"Keyword used to allocate memory for an array."},
  {q:"int[] data = {1, 2, _____};", a:"3", h:"A number value to complete the array literal."},
  {q:"String[] names = _____ String[10];", a:"new", h:"Used to initialize an array with a specific size."},
  {q:"double prices_____ = {1.99, 2.99};", a:"[]", h:"Symbols used to denote an array type."},
  {q:"char[] letters = new _____[26];", a:"char", h:"The data type must match the declaration."},
  {q:"int x = arr[_____];", a:"0", h:"The index of the first element."},
  {q:"arr[1] = _____;", a:"10", h:"Assigning a numeric value to an index."},
  {q:"int last = arr[arr.length _____ 1];", a:"-", h:"Operator used to calculate the last valid index."},
  {q:"System.out.println(arr[_____]);", a:"i", h:"A common variable used as an index in loops."},
  {q:"names[_____] = \"Alice\";", a:"0", h:"The starting position of any array."},
  {q:"int len = arr._____", a:"length", h:"Property used to get the total number of elements."},
  {q:"if (arr.length _____ 0)", a:">", h:"Checking if the array is not empty."},
  {q:"arr.length = 10; // This is _____", a:"false", h:"Arrays have a fixed size and cannot be changed manually."},
  {q:"String s = arr[arr._____ - 1];", a:"length", h:"The property that defines the array's boundary."},
  {q:"double d = arr[_____ / 2];", a:"length", h:"Used to find the approximate middle element."},
  {q:"for(int i=0; i < arr._____; i++)", a:"length", h:"Loop condition to prevent going out of bounds."},
  {q:"for(int x _____ myArr)", a:":", h:"The symbol used in an enhanced for-each loop."},
  {q:"total += numbers[_____];", a:"i", h:"The loop counter used to access elements."},
  {q:"for(int i = arr.length - 1; i _____ 0; i--)", a:">=", h:"Condition for looping backwards through an array."},
  {q:"for(int val _____ nums)", a:":", h:"The separator used in a for-each loop."},
  {q:"int[][] matrix = new int[3][_____];", a:"3", h:"Defining the column size of a 2D array."},
  {q:"int val = matrix[0][_____];", a:"0", h:"Accessing the first element of the first row."},
  {q:"int rows = matrix._____", a:"length", h:"Property to get the number of rows in a 2D array."},
  {q:"int cols = matrix[0]._____", a:"length", h:"Property to get the number of columns in a row."},
  {q:"int[][] grid = _____ {{1,2}, {3,4}};", a:"new", h:"Used when initializing a 2D array with values."}
];

// Duplicate
let fullChallenges = [];
for(let i=0;i<2;i++) fullChallenges.push(...baseChallenges);

// Shuffle questions
shuffleArray(fullChallenges);

// Set total questions
const totalQuestions = fullChallenges.length;
const gameTitle = 'Syntax Error - Arrays';

document.getElementById("totalQuestions").innerText = totalQuestions;

// Load the first challenge
if (fullChallenges.length > 0) {
  loadChallenge();
}
