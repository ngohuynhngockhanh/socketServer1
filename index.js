var util = require('util');
var app = require('http').createServer();
var io = require('socket.io')(app);
var fs = require('fs');
app.listen(3484);

//giải nén chuỗi JSON thành các OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}

//Gửi dữ liệu thông qua 
function sendTime() {
    io.sockets.emit('atime', {
		khanh_dep_trai: "khanh dep trai",
        ESP8266: 12,
		soPi: 3.14,
		time: new Date()
    });
}

//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {
	//hàm console.log giống như hàm Serial.println trên Arduino
	
    console.log("Connected"); //In ra màn hình console là đã kết nối thành công.
	
	//Gửi lệnh 
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });
    socket.on('connection', function(data) {
        console.log(data);
    });
    socket.on('atime', function(data) {
        sendTime();
        console.log(data);
    });
});