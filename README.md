# Paper English

Ứng dụng học tiếng Anh chạy cục bộ bằng Node.js 18 trở lên. Không cần cài thư viện.

## Chạy

```powershell
cd paper-english
npm start
```

Mở http://localhost:4173. Giữ cửa sổ chạy server mở khi sử dụng. Dừng bằng Ctrl+C.

## Sử dụng

- Bộ đề demo có thể xóa trong Thư viện. Chọn Quick Quiz hoặc Ghép câu để học.
- Nhập câu hỏi hỗ trợ CSV UTF-8, văn bản theo mẫu `sample.txt`, và tạo thủ công. Xem trước và sửa các trường câu hỏi, đáp án, giải thích trước khi lưu. CSV mẫu 20 câu ở `sample-20.csv`. Với Quiz một đáp án, correct_answer là A–D; nhiều đáp án dùng A,C. Các loại: single, multi, truefalse, blank, sentence.
- Thư viện cho phép mở, sao chép, xóa, xuất CSV/JSON và thêm câu. Xóa cần xác nhận.
- Cài đặt > Xuất bản sao lưu JSON để lưu tất cả dữ liệu. Nhập bản sao lưu thay thế dữ liệu hiện tại. IndexedDB chỉ lưu trong trình duyệt và thiết bị hiện tại; xóa dữ liệu trình duyệt có thể xóa bài học. Không có đồng bộ giữa thiết bị.
- Thống kê dùng lượt trả lời đã kiểm tra/nộp, không tính lượt mở trang. Ngày tính theo Asia/Ho_Chi_Minh. Thời gian là thời gian trên câu, giới hạn 5 phút mỗi lượt và có thể không phản ánh chính xác thời gian thực nếu để tab mở.

## Kiểm thử

`npm test` chạy các kiểm thử parser, chấm điểm và thống kê; `node --check dist/app.js` kiểm tra cú pháp.

## Giới hạn hiện tại

Đây là bản triển khai ban đầu, chưa đáp ứng toàn bộ đặc tả: chưa có ánh xạ cột CSV tùy ý hoặc phát hiện trùng, chưa sửa lựa chọn trong trình chỉnh sửa, chưa có timer, kéo đổi vị trí từ bằng thao tác cảm ứng, các câu thay thế hợp lệ trong giao diện, biểu đồ phân tích đầy đủ, hay toàn bộ hiệu ứng chuyển động được yêu cầu. Các luồng Quiz, ghép câu bằng cách chạm, nhập văn bản và khôi phục sau tải lại đã được kiểm tra cơ bản; chưa kiểm thử toàn diện trên mọi thiết bị. Không nên coi phiên bản này là sản phẩm đã nghiệm thu.



## Phát âm tiếng Anh

Trong Quiz, chọn **Nghe câu hỏi**; trong Ghép câu, nghe câu đã ghép hoặc câu đúng sau khi kiểm tra. Trang Cài đặt có bật/tắt, giọng Mỹ/Anh, giọng cụ thể, tốc độ và tự đọc câu đúng. Các tùy chọn được lưu cùng dữ liệu IndexedDB và có trong sao lưu JSON. CSV có thể dùng cột `tts_text`; TXT có thể thêm dòng `TTS: ...` để khai báo nội dung đọc riêng. Nếu không có giọng đúng vùng, ứng dụng hiển thị giọng tiếng Anh thay thế hoặc giọng mặc định. Giọng và khả năng phát phụ thuộc vào trình duyệt và thiết bị; một số giọng có thể dùng dịch vụ của nhà cung cấp.
