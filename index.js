const PORT = 3484;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server

var http = require('http') 							//#include thư viện http - Tìm thêm về từ khóa http nodejs trên google nếu bạn muốn tìm hiểu thêm. Nhưng theo kinh nghiệm của mình, Javascript trong môi trường NodeJS cực kỳ rộng lớn, khi bạn bí thì nên tìm hiểu không nên ngồi đọc và cố gắng học thuộc hết cái reference (Tài liêu tham khảo) của nodejs làm gì. Vỡ não đó!
var socketio = require('socket.io')				//#include thư viện socketio

var ip = require('ip');
var app = http.createServer();					//#Khởi tạo một chương trình mạng (app)
var io = socketio(app);								//#Phải khởi tạo io sau khi tạo app!
app.listen(PORT);										// Cho socket server (chương trình mạng) lắng nghe ở port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)

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
	
	//Đây là một chuỗi JSON
	var json = {
		khanh_dep_trai: "khanh dep trai", 	//kiểu chuỗi
        ESP8266: 12,									//số nguyên
		soPi: 3.14,										//số thực
		time: new Date()							//Đối tượng Thời gian
    }
    io.sockets.emit('atime', json);
}

//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {	//'connection' (1) này khác gì với 'connection' (2)
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
	//Gửi đi lệnh 'welcome' với một tham số là một biến JSON. Trong biến JSON này có một tham số và tham số đó tên là message. Kiểu dữ liệu của tham số là một chuối.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });
	
	//Khi lắng nghe được lệnh "connection" với một tham số, và chúng ta đặt tên tham số là message. Mình thích gì thì mình đặt thôi.
	//'connection' (2)
    socket.on('connection', function(message) {
        console.log(message);
    });
	
	//khi lắng nghe được lệnh "atime" với một tham số, và chúng ta đặt tên tham số đó là data. Mình thích thì mình đặt thôi
    socket.on('atime', function(data) {
        sendTime();
        console.log(data);
    });
	
	socket.on('arduino', function (data) {
	  io.sockets.emit('arduino', { message: 'R0' });
      console.log(data);
    });
});