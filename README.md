# AI Lành Nghề bản demo tích hợp

Bản này kết hợp không gian 5 thành phần theo mục 2.1.2 với chức năng tham khảo từ https://github.com/annguyen30112301/ai-lanh-nghe.

## Chức năng
- Trang chủ và luồng khám phá, lựa chọn, đặt mua mô phỏng, sử dụng.
- Danh mục 33 nghề, tìm kiếm không dấu, lọc nhóm/trạng thái; 31 gói lộ trình có 155 ví dụ từ nguồn.
- Gói Mua hàng giữ đủ cấu hình, 24 tình huống, sổ tay/checklist, an toàn, cập nhật/hỗ trợ.
- Bàn thử việc 6 kịch bản Mua hàng/Giảng dạy có lỗi cài sẵn, sửa lỗi làm thay đổi đầu ra.
- Bảng giá, giỏ cá nhân/doanh nghiệp, nhóm chỗ sử dụng, nghề chính, tinh chỉnh, công thức ưu đãi và báo giá CSV.
- Đặt mua 3 bước mô phỏng; lịch sử đơn, chỗ dùng mẫu, báo giá mua thêm theo ngày và gia hạn.
- Ước tính giờ theo đầu việc với các giả định do người dùng chỉnh sửa.
- Doanh nghiệp: nhân sự mẫu/cảnh báo ngừng dùng, đo trước–sau, kiểm duyệt đầu ra, nhật ký và xuất CSV.
- Tài nguyên có bài hướng dẫn thực sự mở được, câu hỏi thường gặp và liên kết tài liệu.
- Sơ đồ hệ thống có thêm luồng từ khám phá đến theo dõi sau giao dịch.

## Chạy
Các tệp website đặt ngay ở thư mục gốc repository, sẵn cho GitHub Pages từ nhánh main và thư mục / (root). Không cần build. Chạy máy chủ web ở thư mục gốc repository để có đầy đủ lưu trữ và bàn thử việc nhúng.
Trang đầu là index.html; các màn hình dùng hash URL.

## Giá và trạng thái
Giá và quy tắc lấy từ assets/reference/tinh-tien.js: gói Mua hàng 690.000 đ/năm; tinh chỉnh cá nhân 800.000 đ/lần; tinh chỉnh doanh nghiệp Mua hàng 3 triệu/lần. Các nghề đang đóng gói dùng giá đề xuất; Giảng dạy chưa có giá. Thuế GTGT chưa chốt trong nguồn nên không tự cộng tỷ lệ. Ưu đãi tối đa 50% mỗi dòng.
Nội dung sổ tay và cấu hình vẫn là mẫu rút gọn.

## Phạm vi demo
Không gọi AI thật, không thu tiền, không gửi lịch hỗ trợ, không đăng nhập/phân quyền ứng dụng thật. Không nhập thông tin nhạy cảm hoặc tài liệu thật. Bản triển khai Sites có lớp truy cập riêng tư của nền tảng.
localStorage: ai-lanh-nghe-demo-v1 giữ tiến độ thực hành cũ; aln-integrated-demo-v2 giữ giỏ, đơn, thuê bao, ước tính và kiểm duyệt mẫu. Dữ liệu không đồng bộ giữa thiết bị.
Báo cáo thực hành thuộc trình duyệt; bảng nhân sự doanh nghiệp dùng mẫu riêng và được gắn nhãn.

## Nguồn kế thừa
assets/reference/tinh-tien.js và tests/pricing.test.js: bộ tính và 26 kiểm thử.
assets/reference/nghe-data.js: danh mục nghề và ví dụ.
assets/reference/dung-thu*.js, fonts.css, tokens.css, site.css, dung-thu.css và phông/ảnh đi kèm: bàn thử việc và một số tài nguyên giao diện.
app.js, extended.js, integrated.css, trial-bridge.js: kết nối vào không gian 5 thành phần.
Giữ thông tin nguồn trong NGUON_THAM_KHAO.json. Repository nguồn chỉ được đọc và tham khảo, không bị cập nhật.

## Kiểm tra đã thực hiện
26/26 kiểm thử bộ tính giá. Kiểm tra trực tiếp tìm nghề không dấu, giỏ doanh nghiệp 40 chỗ (24.840.000 đ), bước xác nhận đơn, gán chỗ, báo giá mua thêm/gia hạn, cổng checklist kiểm duyệt, sửa lỗi VAT, ước tính và số phút sau cao hơn trước. Kiểm tra các trang mới ở màn hình điện thoại không tràn ngang.

