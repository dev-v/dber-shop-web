const max = (len) => ({max: len, message: `最大长度不能超过${len}个字符！`});
const min = (len) => ({min: len, message: `长度至少需为${len}个字符！`});
const required = {required: true, message: '该项为必填项！'};
const phone = {max: 20, message: `最大长度不能超过20个字符！`};

export {max, min, required, phone};
