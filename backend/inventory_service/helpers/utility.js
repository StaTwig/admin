exports.randomNumber = function (length) {
  let text = "";
  const possible = "123456789";
  for (let i = 0; i < length; i++) {
    const sup = Math.floor(Math.random() * possible.length);
    text += i > 0 && sup == i ? "0" : possible.charAt(sup);
  }
  return Number(text);
};

exports.asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.excludeExpireProduct = (data) => {
  return data.filter((product) => {
    const expiryDate = product.expiryDate.split('/');
    const expiryDateInShortDate = [expiryDate[1], expiryDate[0], expiryDate[2]].join('/');
    const d = new Date(expiryDateInShortDate);
    const currentDate = new Date();
    if (d.getFullYear() > currentDate.getFullYear()) {
      return true;
    } else if (d.getFullYear() === currentDate.getFullYear() && d.getMonth() > currentDate.getMonth()) {
      return true
    }
    return false
  })
}