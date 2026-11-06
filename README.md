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

Đây là bản triển khai ban đầu, chưa đáp ứng toàn bộ đặc tả: chưa có ánh xạ cột CSV tùy ý hoặc phát hiện trùng, chưa sửa lựa chọn trong trình chỉnh sửa, chưa có timer, kéo đổi vị trí từ, các câu thay thế hợp lệ trong giao diện, biểu đồ phân tích đầy đủ, hay toàn bộ hiệu ứng chuyển động được yêu cầu. Kiểm thử tích hợp, phục hồi IndexedDB sau tải lại và responsive chưa được xác nhận đầy đủ. Không nên coi phiên bản này là sản phẩm đã nghiệm thu.

