export default class ArrayUtil {
  static findIndexById = (array, id) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        return i; // Return the index if the id matches
      }
      if (array[i].children && array[i].children.length > 0) {
        const childIndex = this.findIndexById(array[i].children, id);
        if (childIndex !== -1) {
          return i; // Return the index of the parent if the id is found in children
        }
      }
    }
    return -1; // Return -1 if the id is not found
  };
}
