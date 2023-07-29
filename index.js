/** ts-check */
const fs = require("fs");

function sluggify(str) {
  // Remove numbers and dashes from the string using regular expressions
  const cleanedStr = str.replace(/[0-9-]/g, "");

  // Replace spaces and special characters with dashes using regular expressions
  const sluggifiedStr = cleanedStr.replace(/[^a-zA-Z0-9]+/g, "-");

  // Convert the string to lowercase
  return sluggifiedStr.toLowerCase();
}

// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir);
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`;
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      getFiles(name, files);
    } else {
      // If it is a file, push the full path to the files array
      const filename = name.replace("./imgs/", "");
      files.push({
        filename,
        make: sluggify(filename.replace(".png", "")),
        title: filename.replace(".png", "").replace("-1", ""),
      });
    }
  }
  return files;
}

const images = getFiles("./imgs");

fs.writeFileSync("data.json", JSON.stringify(images, null, 2), { flag: "w+" });
