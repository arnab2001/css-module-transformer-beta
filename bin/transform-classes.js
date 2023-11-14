#!/usr/bin/env node

const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path.');
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath, 'utf-8');

// Define your regex pattern to match and replace import statement
const importRegex = /import\s+(['"])(\.\/\w+\.css)\1\s*;/;
const importMatch = fileContent.match(importRegex);

if (importMatch) {
  const newImport = `import styles from ${importMatch[1]}${importMatch[2].replace('.css', '.module.css')}${importMatch[1]};`;
  const updatedContentWithImport = fileContent.replace(importRegex, newImport);
  fs.writeFileSync(filePath, updatedContentWithImport, 'utf-8');
} else {
  console.error('CSS import statement not found.');
  process.exit(1);
}

// Define your regex pattern to match and replace class names
const regex = /className\s*=\s*["']([^"']+)["']/g;
const updatedContent = fileContent.replace(regex, (match, className) => {
  // Check if the class name contains a hyphen
  if (className.includes('-')) {
    return `className={styles["${className}"]}`;
  } else {
    return `className={styles.${className}}`;
  }
});

fs.writeFileSync(filePath, updatedContent, 'utf-8');

console.log(`Class names and import statement in ${filePath} have been transformed.`);
