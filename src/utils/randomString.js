// Hàm tạo chuỗi ngẫu nhiên với độ dài mặc định là 128 (hoặc có thể truyền độ dài mong muốn)
const randomString = (length = 128) => {
  // Khởi tạo chuỗi kết quả rỗng
  let result = "";
  // Chuỗi chứa các ký tự có thể xuất hiện trong chuỗi ngẫu nhiên
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // Độ dài của chuỗi ký tự
  const charactersLength = characters.length;
  // Biến đếm để kiểm soát độ dài của chuỗi ngẫu nhiên
  let counter = 0;

  // Lặp để tạo chuỗi ngẫu nhiên
  while (counter < length) {
    // Chọn ngẫu nhiên một ký tự từ chuỗi characters và thêm vào chuỗi kết quả
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // Tăng biến đếm lên 1
    counter += 1;
  }

  // Trả về chuỗi ngẫu nhiên đã tạo
  return result;
};

// Export hàm randomString như một module
export { randomString };
