var fs = require('fs');

var jsFiles = [],  // src/js/*.js文件，本代码未校验文件是否是 .js
	generatedDir = './'; // 生成 app.js 的目录

/**
 * 生成文件
 * @param  {String} file 需要生成的文件，如 './dist/example.html'
 * @param  {String} html 源文件文本内容
 */
function writeFile(file, html){  
    fs.writeFile(file, html, function(err){
        var fileName =  file.split('/').pop();

        if (err) {
        	console.log(fileName + " change from org to com fail.\n" + err);
        } else {
            console.log(fileName + " done");  
        }
    });
}

/**
 * 查找某个目录下的所有文件
 * @param  {String} dir 目录
 * @return {Array}     该目录下的所有文件路径数组
 */
function walk(dir) {
    var results = [];
    var list = fs.readdirSync(dir); // 获取该目录下的文件、文件夹名称

    list.forEach(function(file) {
        file = dir + '/' + file; // 拼凑路径
        
        var stat = fs.statSync(file);

        if (!stat.isDirectory()) { // 如果不是文件夹
        	results.push(file);
        }
    });

    return results
}

jsFiles = walk(generatedDir);
jsFiles.forEach(function(file) {
	var orgFileName = file.split('/').pop(); // 获取文件名称
	var html = fs.readFileSync(file, "utf8"); // 以 utf8 格式读取文件的内容

    html = html.replace(/static.uc108.org:1505/g, 'static.uc108.com'); // 将 org 的域名转换成 com

	writeFile(comDir + '/' + orgFileName, html); // 以覆盖的形式生成文件
});