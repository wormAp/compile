/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
export default function * arrayToGenerator(arr) {
    for(let i=0;i<arr.length;i++){
        yield arr[i];
    }
}
