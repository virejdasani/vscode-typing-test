"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.activate=void 0;const vscode_1=require("vscode"),webviewPanel_1=require("./webviewPanel/webviewPanel");let myStatusBarItem;function activate(context){const fs=require("fs"),rawdata=fs.readFileSync(`${context.extensionPath}/media/words.json`,"utf8"),data=JSON.parse(rawdata),words=data.words,codes=data.codes;myStatusBarItem=vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left,1),myStatusBarItem.command="warmUp.start",myStatusBarItem.tooltip="Start typing test",myStatusBarItem.text="$(record-keys) Warm Up",context.subscriptions.push(myStatusBarItem),myStatusBarItem.show(),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.start",()=>{webviewPanel_1.default.createOrShow(context.extensionUri),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendStartAndConfig(words,codes)})),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.practiceWithSelection",()=>{const editor=vscode_1.window.activeTextEditor;if(!editor)return;const selections=editor.selections;let selectedCode=editor.document.getText(selections[0]);if(0==selectedCode.length)return;selectedCode=selectedCode.substring(0,3e3);let selectedCodeLanguage=editor.document.fileName.split(".").pop();webviewPanel_1.default.createOrShow(context.extensionUri),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendStartWithSelectionAndConfig(selectedCode,selectedCodeLanguage,words,codes)})),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.switchNaturalLanguage",(async function showQuickPick(){const userChoice=await vscode_1.window.showQuickPick(["english","italian","german","spanish","chinese","korean","polish","swedish","french","portuguese","russian","finnish","englishTop1000"],{placeHolder:"Choose a natural language to practice with."});await vscode_1.workspace.getConfiguration().update("warmUp.switchNaturalLanguage",userChoice,vscode_1.ConfigurationTarget.Global),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendConfigMessage("switchNaturalLanguage",userChoice)}))),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.switchProgrammingLanguage",(async function showQuickPick(){const userChoice=await vscode_1.window.showQuickPick(["javascript","python","java","csharp","php","typescript","cpp","c","go","kotlin","ruby","rust"],{placeHolder:"Choose a programming language to practice with."});await vscode_1.workspace.getConfiguration().update("warmUp.switchProgrammingLanguage",userChoice,vscode_1.ConfigurationTarget.Global),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendConfigMessage("switchProgrammingLanguage",userChoice)}))),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.changeTypingMode",(async function showQuickPick(){let userChoice=await vscode_1.window.showQuickPick(["$(book) words (fixed amount)","$(watch) words (against the clock)","$(code) code snippets"],{placeHolder:"Practice a fixed amount of words, against the clock or with code snippets."});"$(book) words (fixed amount)"===userChoice?userChoice="words (fixed amount)":"$(watch) words (against the clock)"===userChoice?userChoice="words (against the clock)":"$(code) code snippets"===userChoice&&(userChoice="code snippets"),await vscode_1.workspace.getConfiguration().update("warmUp.changeTypingMode",userChoice,vscode_1.ConfigurationTarget.Global),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendConfigMessage("changeTypingMode",userChoice)}))),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.togglePunctuation",(async function showQuickPick(){let userChoice=await vscode_1.window.showQuickPick(["$(circle-slash) false","$(check) true"],{placeHolder:'Enable or disable punctuation (doesn\'t affect "code snippets" mode).'});"$(circle-slash) false"===userChoice?userChoice="false":"$(check) true"===userChoice&&(userChoice="true"),await vscode_1.workspace.getConfiguration().update("warmUp.togglePunctuation",userChoice,vscode_1.ConfigurationTarget.Global),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendConfigMessage("togglePunctuation",userChoice)}))),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.changeCount",(async function showQuickPick(){const userChoice=await vscode_1.window.showQuickPick(["15","30","60","120","240"],{placeHolder:'Change the amount of words or the timer (doesn\'t affect "code snippets" mode).'});await vscode_1.workspace.getConfiguration().update("warmUp.changeCount",userChoice,vscode_1.ConfigurationTarget.Global),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendConfigMessage("changeCount",userChoice)}))),context.subscriptions.push(vscode_1.commands.registerCommand("warmUp.toggleColorBlindMode",(async function showQuickPick(){let userChoice=await vscode_1.window.showQuickPick(["$(circle-slash) false","$(check) true"],{placeHolder:'Enable or disable color blind mode (doesn\'t affect "code snippets" mode).'});"$(circle-slash) false"===userChoice?userChoice="false":"$(check) true"===userChoice&&(userChoice="true"),await vscode_1.workspace.getConfiguration().update("warmUp.toggleColorBlindMode",userChoice,vscode_1.ConfigurationTarget.Global),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendConfigMessage("toggleColorBlindMode",userChoice)}))),vscode_1.window.registerWebviewPanelSerializer&&vscode_1.window.registerWebviewPanelSerializer(webviewPanel_1.default.viewType,{async deserializeWebviewPanel(webviewPanel,state){webviewPanel.webview.options={enableScripts:!0,localResourceRoots:[vscode_1.Uri.joinPath(context.extensionUri,"media")]},webviewPanel_1.default.revive(webviewPanel,context.extensionUri),webviewPanel_1.default.currentPanel&&webviewPanel_1.default.currentPanel.sendStartAndConfig(words,codes)}})}exports.activate=activate;