import moment from "moment"

export const fomatTimeFromNow = time => {
  //   const time = moment()
  //   return moment(time).fromNow()
  if (!(moment(time).diff(moment(), "days") < 0)) return moment(time).fromNow()
  else return moment(time).format("DD/MM/YYYY")
}
export const checkNews = time => {
  if (!!time) {
    // Thời gian cần kiểm tra
    var thoiGian = moment(time) // Đặt thời gian tùy ý

    // Lấy thời gian hiện tại
    var hienTai = moment().add(1, "days")

    // So sánh khoảng thời gian (2 ngày trước và hiện tại)
    var ngayTruoc = moment().subtract(2, "days")

    // Kiểm tra xem thời gian có nằm trong khoảng 5 ngày trở lại không
    var namTrongKhoang = thoiGian.isBetween(ngayTruoc, hienTai)
    return namTrongKhoang
  } else return false
}
