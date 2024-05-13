export default class ArrayUtil {
  static findIndexById = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i;
      }
      if (array[i].children && array[i].children.length > 0) {
        const childIndex = this.findIndexById(array[i].children, id);
        if (childIndex !== -1) {
          return i;
        }
      }
    }
    return -1;
  };
}
