const fs = require('fs')
const inquirer = require('inquirer');

// Array of questions for user input

const questionList = [
    {
        type: 'input',
        message: 'Title of you project: ',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Description: ',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Install Instructions: ',
        name: 'install',
    },
    {
        type: 'input',
        message: 'Usage Information: ',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Contribution Guidelines: ',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'Test Instructions: ',
        name: 'instructions',
    },
    {
        type: 'input',
        message: 'Email: ',
        name: 'email',
    },
    {
        type: 'input',
        message: 'Github: ',
        name: 'github',
    },
];

// Function to write README file

function writeToFile(fileName, data) {
    fs.writeFile('./' + fileName, data, err => {
        err ? console.error(err)
            : console.log('File Made: '+fileName)
    })
}

// Prompt user with questions to fill README

function init() {
    inquirer.prompt(questionList)
        .then(res => {
            const data = projectTitle(res.title) + '\n'
                + simpleTextBlock("Description", res.description) + '\n'
                + TOC + '\n'
                + simpleTextBlock("Installation", res.install) + '\n'
                + simpleTextBlock("Usage", res.usage) + '\n'
                + license + '\n'
                + simpleTextBlock("Contribution Guidelines", res.contribution) + '\n'
                + simpleTextBlock("Test Instructions", res.instructions) + '\n'
                + questions(res.github, res.email);

            writeToFile("generated-READE.md", data)

            // If there is no 'LICENSE' file, generate it and fill with MIT License
            try {
                if (!fs.existsSync("./LICENSE")) {
                    writeToFile("LICENSE", MITlicense)
                }
            } catch (err) {
                console.error(err)
            }

        }
        );
}

// Start app

init();

/////////////////////
// README TEMPLATE //
/////////////////////

let projectTitle = (title) => `# ${title}
Copyright © 2021 Andrew Trudeau
`;

// Used for basic title, content structure

let simpleTextBlock = (title, description) => `## ${title}
${description}`;

const TOC = `## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)`;

let questions = (gitName, email) => `## Questions

If you wish to reach me for questions, please refer to the contact information below:

Github Profile: [${gitName}](https://github.com/${gitName})

Email Me: [${email}](mailto:${email})

`

// License information

const license = `## License
Copyright © 2021 Andrew Trudeau

Licensed under the [MIT License](LICENSE).
`;

// If there is no 'LICENSE' file, generate it and fill with MIT License

const MITlicense = `
MIT License

Copyright (c) 2021 Andrew Trudeau

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`


