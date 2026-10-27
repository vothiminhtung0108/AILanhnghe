# AI Lành Nghề bản demo tích hợp

Bản này kết hợp không gian 5 thành phần theo mục 2.1.2 với chức năng tham khảo từ https://github.com/annguyen30112301/ai-lanh-nghe.

## Chức năng
- Trang chủ và luồng khám phá, lựa chọn, đặt mua mô phỏng, sử dụng.
- Danh mục 33 nghề, tìm kiếm không dấu, lọc nhóm/trạng thái; 31 gói lộ trình có 155 ví dụ từ nguồn.
- Gói Mua hàng giữ đủ cấu hình, 24 tình huống, sổ tay/checklist, an toàn, cập nhật/hỗ trợ.
- Bàn thử việc 6 kịch bản Mua hàng/Giảng dạy có lỗi cài sẵn, sửa lỗi làm thay đổi đầu ra.
- Bảng giá, giỏ cá nhân/doanh nghiệp, nhóm chỗ sử dụng, gói Cá nhân/Business/Business Plus, tinh chỉnh 1:1 và báo giá CSV.
- Đặt mua 3 bước mô phỏng; lịch sử đơn, chỗ dùng mẫu, báo giá mua thêm theo ngày và gia hạn.
- Ước tính giờ theo đầu việc với các giả định do người dùng chỉnh sửa.
- Doanh nghiệp: nhân sự mẫu/cảnh báo ngừng dùng, đo trước–sau, kiểm duyệt đầu ra, nhật ký và xuất CSV.
- Tài nguyên có bài hướng dẫn thực sự mở được, câu hỏi thường gặp và liên kết tài liệu.
- Sơ đồ hệ thống có thêm luồng từ khám phá đến theo dõi sau giao dịch.

## Chạy
Các tệp website đặt ngay ở thư mục gốc repository, sẵn cho GitHub Pages từ nhánh main và thư mục / (root). Không cần build. Chạy máy chủ web ở thư mục gốc repository để có đầy đủ lưu trữ và bàn thử việc nhúng.
Trang đầu là index.html; các màn hình dùng hash URL.

## Giá và trạng thái
Bảng giá hiện tại đối chiếu ngày 27/10/2026 tại https://ai-lanh-nghe-app.nghoangan-bt96.workers.dev/bang-gia/.
- Dùng thử 0 đ; theo mô hình nguồn có 5 lượt AI do AI Lành Nghề trả. Bản tĩnh này chỉ có bài thử soạn sẵn, không cấp lượt AI thật.
- Cá nhân: 690.000 đ/năm; Business: 690.000 đ/người/năm; Business Plus: 990.000 đ/người/năm.
- Tinh chỉnh 1:1: 800.000 đ/lần, không nhân theo số người. Không tự lặp lại khi gia hạn.
- Custom doanh nghiệp: 25–80 triệu đ, báo giá riêng theo số quy trình; không tự cộng vào giỏ hàng.
- Phí AI trả trực tiếp cho nhà cung cấp AI, không nằm trong giá gói hoặc doanh thu của AI Lành Nghề.
- Nguồn hiện tại chưa công bố chiết khấu hoặc xử lý thuế GTGT, nên không tự giảm giá hoặc thêm tỷ lệ thuế.
Chỉ Mua hàng có giá trong bộ báo giá hiện tại; các nghề lộ trình không được bán theo giá đề xuất cũ.
revenue-pricing.js sử dụng bộ số học cũ với cấu hình giá mới; assets/reference/tinh-tien.js được giữ để đối chiếu lịch sử. Đơn cũ giữ nguyên số tiền; giỏ được chuyển sang gói hiện tại và thuê bao mới lưu gói sử dụng. Thuê bao theo phiên bản cũ cần tạo đơn mới để thử vòng đời theo bảng giá mới.
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
8 kiểm thử giá hiện tại tại tests/revenue-pricing.test.js: ba gói, dịch vụ một lần, không áp ưu đãi cũ, nhiều nhóm, mua thêm, gia hạn, chặn nghề chưa niêm yết và bảo toàn đơn cũ. 26 kiểm thử tại tests/pricing.test.js kiểm tra nguyên trạng bộ tính lịch sử, không phải bảng giá công khai hiện tại.
Chạy: node --test tests/*.test.js
