/** 模拟请求 */
export function mockRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 800);
  });
}
