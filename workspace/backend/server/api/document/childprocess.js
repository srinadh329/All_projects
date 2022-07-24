var shell = require('shelljs');
var fs = require('fs');

process.on('message', function (data) {
    // console.log(data)
    console.log("<<<<------In Child Process--->>>>")
    if (!shell.exec(data.sshCommand).code) {
        console.log('Created Images In child process------------->')
        process.send('success');
    }
    else {
        var pdfFile = data.filepath;
        const { PDFDocumentFactory, PDFDocumentWriter, StandardFonts, drawLinesOfText, drawText, drawImage, drawRectangle } = require('pdf-lib');
        const loadPdf = fs.readFileSync(pdfFile);
        const pdfDoc = PDFDocumentFactory.load(loadPdf);
        const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
        fs.writeFileSync(pdfFile, pdfBytes);
        if (!shell.exec(data.sshCommand).code) {
            console.log('Created Images with Dummy In child process------------>')
            process.send('success');
        }
    }
})