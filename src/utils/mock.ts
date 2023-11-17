import { Album, Comment, Photo } from '@/api/types';

export const mockPhotos: Photo[] = [
  {
    id: '1',
    name: '2023-05-26 22-17-11',
    url: 'https://fffff.games/cdn/p/ffxiv_dx11 2023-05-26 22-17-11.png',
    width: 1920,
    height: 1080,
    thumbnail:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAQACAwAAAAAAAAAAAAAAAAgEBQYHCf/EACcQAAIBAwMDBAMBAAAAAAAAAAECAwQFEQAGEgchMRMUInEVQWHR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAwQFAP/EACURAAIBAgQGAwAAAAAAAAAAAAECAAMRBCFSkTEyQVFx8IHB0f/aAAwDAQACEQMRAD8A8+U6C7xqJxFDapXdscUIwxz47HWvfpBudIEmFEHifurxyKwYYyCMHxg5z41bN0ro7/f63bVFS0k93om51UkQ/KupQEBS3BfjmSMBC3NSkucMFJyaa3VU0Fpo6a9+3tApo5YRL6hWlKhpmnjV0ASBliibCuDGUHMqe+imiyi5YW9ymSojm1j718SGX6d7ioHaGS11KuD3HpN/mmqjvk0lpus8UscM8jcZCYa2KFQCo44HFgQV4sGU8SGGCw+bNAsda7n8jNk0ttO/N/baiuuz1vMtVMtY8kgyqREB1jZlkGUJ5ZY9s8T+xqfjvC57f2Ja5aGcwVfqyL7pCVkwlS0agYIAHEYwAAQSD2ONNNRA7Nh6ak5dvmXyiriajAZkfU4Deb9WXW61VVUymSaRyWbJH0PoeB/BppppkcIq3MZ//9k=',
  },
  {
    id: '2',
    name: '2023-05-26 23-21-48',
    url: 'https://fffff.games/cdn/p/ffxiv_dx11 2023-05-26 23-21-48.png',
    width: 1920,
    height: 1080,
    thumbnail:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGBwEI/8QAKRAAAgEDAwQBAwUAAAAAAAAAAQIDBAURAAYhBxITMUEIFBUyQlFhcf/EABcBAQEBAQAAAAAAAAAAAAAAAAIFAwT/xAAhEQACAgECBwAAAAAAAAAAAAAAAQIRAxIxExQhM1GB8P/aAAwDAQACEQMRAD8AsW2+rVxs60tso6mKfxkuKeRCzFFBZlDZHsBuOf61aOoPUa+Q0cr0s8duo4ESQzRsfJUGQsURSncFIQdxBI5z7yuefT7s2go+oeNx1kNrr6iGWmpLLcIfHNWntzI8YmJZ1ETkEp+1znAUgz3V/pRFt+x/hBHdrxBRU33FHXzkmPs70iELSE8yBQvs8gFsZyNXoztNs45LRHRbt0eY77u6tvFxepq3kqZmGC8zMzY+Bk6ajqvbUk9TJ5mrqGRTgwpSLUAD2CHVxnIIPIB5/wA01lx4eActkZudOiyVu27mo8NV5grmM8OQ3YWwf0OVUDuTtI+CMDGudQd9XO5zQ2ycwmjkgDOioQSSeDnOQRjjGPnORxppoPsx9lbLFXF191MluMMcdW6lBJj0WJyM844x/Ommmpz3Gtj/2Q==',
  },
  {
    id: '3',
    name: '2023-08-20 21-11-28',
    url: 'https://fffff.games/cdn/p/ffxiv_dx11 2023-08-20 21-11-28.png',
    width: 1920,
    height: 1080,
    thumbnail:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcIBQb/xAAtEAACAQMCBAMIAwAAAAAAAAABAgMEBREABgcSITEVQVEIExQWIiUyYUKRsf/EABcBAAMBAAAAAAAAAAAAAAAAAAMEBQL/xAAmEQABAgMGBwAAAAAAAAAAAAABAAIDESESExQxMjNRcYGhwdHh/9oADAMBAAIRAxEAPwDP1y4F2mvuG3Pl6Oo8IrFzeJaKjctRTRDldUV5XZiep6Nglx07KG3toWvZlqqpL9t5KW8Uyha2ir0aR0bHT6ZM4DBsgjoQQeoxqz8N77urblit0L7NNzheWaSCqWaMSCKRjIY8M2ckgfojlHlk+K413Gruu72qqlo6jxGmeilgckNQfDysWZk7CMpIhXBOW5h3I5oDwXm7nNW2ZWpVXQoF2rHRQvX7co6Z5V95F9igkDxn8XUrG2FPXAbB/QyNNUOy7IZ7LQLU3GvEkcKryM0DlB3C5ZScDOMaaBhm8O/xGoqXTIsVLGyqAXePOB6mMf5rA3GXeN2ofaA3PSwVTJTT3OlV4v4lVCsBj0z/AH56aaZgbnTyEvE0jn7VL4kbtv8AZ7zSR0F8uFJFLRpM0aTkjmLNkjmyR27dtNNNUAAtxKOK/9k=',
  },
  {
    id: '4',
    name: '2023-08-22 21-54-40',
    url: 'https://fffff.games/cdn/p/ffxiv_dx11 2023-08-22 21-54-40.png',
    width: 1920,
    height: 1080,
    thumbnail:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAUHCAn/xAAnEAACAQMEAgIBBQAAAAAAAAABAgMEBREABhIxByETIkEIMlGRwf/EABcBAQEBAQAAAAAAAAAAAAAAAAYFAgP/xAAjEQABAwQCAQUAAAAAAAAAAAABAAIRAwUhMQQSsRNRYcPR/9oADAMBAAIRAxEAPwCqPE1TTPt3cEVNbaC4vBQpJU1lwiV34BmLhPkJx2gwuMhQTg6ePfEFm37brxcHa40kMfJ4ZoFVaeH6MxV+eWbBVh6OQOJJPLOrx/TV49sNP40vaV22l3BX1MnzrURTKUeJVz8OMnHFv3MoJBlwegDL7H8JWOu8G3lKSitsdyuFVUmI1kXzSrxPuONuRZSoUr22Cpb3k5xQs9auOzXROUw5Vxp0KbWVaWWwDkbcJadzEZP6sMVVNGlTLGssU4jYp8ig4bH5601M1ez6qmraiNA0iB8BoIy6nAA7A9dddjTXPoRggqQe06XS3wwptOy7fSU7FYXjeFhgAnhM6BvQH2wq/wBdao3YG67pLed6Ui1TRUsVYlWkMfoCWWiqzI38/YxocZxnrTTTK07aPk+FWvDR6vNMaez7B4WOV3veVyBVkDPQUfn3/ummmjYc73R1+XElf//Z',
  },
];

// 'cdn/p/ffxiv_dx11 2023-09-01 22-06-07.png',
// 'cdn/p/ffxiv_dx11 2023-09-10 11-07-54.png',
// 'cdn/p/ffxiv_dx11 2023-10-15 21-37-44.png',
// 'yixisi/album/ffxiv_dx11 2023-06-24 22-28-46.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 21-22-49.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 21-24-18.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 21-27-03.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 21-52-22.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 21-59-18.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-17-01.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-18-46.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-25-13.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-27-11.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-30-52.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-44-22.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-49-45.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 22-55-42.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 23-03-26.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 23-06-56.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 23-09-25.png',
// 'yixisi/album/ffxiv_dx11 2023-10-02 23-13-21.png',

export const mockCommonts: Comment[] = [
  {
    _id: 'id1',
    albumId: '1',
    albumName: 'album name',
    albumAuthorId: 'a1',
    replierId: 'o1',
    replierName: '回复人1',
    avatar:
      'https://p9-passport.byteacctimg.com/img/user-avatar/dd0631bfdae04026ee702667b004027d~50x50.awebp',
    content: '好看好看！',
    t: 1699322089,
  },
  {
    _id: 'id2',
    albumId: '1',
    albumName: 'album name',
    albumAuthorId: 'a1',
    replierId: 'o2',
    replierName: '回复人2',
    avatar:
      'https://p26-passport.byteacctimg.com/img/user-avatar/ef01dadff9dc8a7f15eed0386b2a1720~50x50.awebp',
    content: '好看好看好看好看好看好看好看好看！',
    t: 1699322089,
  },
  {
    _id: 'id3',
    albumId: '1',
    albumName: 'album name',
    albumAuthorId: 'a1',
    replierId: 'o1',
    replierName: '回复人1',
    replyId: 'id2',
    avatar:
      'https://p9-passport.byteacctimg.com/img/user-avatar/dd0631bfdae04026ee702667b004027d~50x50.awebp',
    content: '好看好看！',
    t: 1699322089,
  },
  {
    _id: 'id5',
    albumId: '1',
    albumName: 'album name',
    albumAuthorId: 'a1',
    replierId: 'o4',
    replierName: '回复人4',
    avatar:
      'https://p6-passport.byteacctimg.com/img/user-avatar/eccbd6c74379889aee23eff8569c815c~50x50.awebp',
    content: '好看好看！',
    deleted: true,
    t: 1699322089,
  },
  {
    _id: 'id4',
    albumId: '1',
    albumName: 'album name',
    albumAuthorId: 'a1',
    replierId: 'o3',
    replierName: '回复人3',
    replyId: 'id2',
    avatar:
      'https://p26-passport.byteacctimg.com/img/user-avatar/92461f1c52036b2166e3faa1f523e8d5~50x50.awebp',
    content: '好看好看！',
    deleted: true,
    t: 1699322089,
  },
  {
    _id: 'id6',
    albumId: '1',
    albumName: 'album name',
    albumAuthorId: 'a1',
    replierId: 'o3',
    replierName: '回复人3',
    replyId: 'id4',
    avatar:
      'https://p26-passport.byteacctimg.com/img/user-avatar/92461f1c52036b2166e3faa1f523e8d5~50x50.awebp',
    content: '1好看好看！',
    t: 1699322089,
  },
];

export const mockAlbum: Album = {
  id: 'aaa',
  name: 'mock album',
  userId: 'id3',
  userName: '虚拟用户1',
  desc: 'desc',
  star: 0,
  photoNum: 9,
  commentNum: 12,
  createTime: 1698843600,
  updateTime: 1699716600,
  photos: mockPhotos,
  tags: [],
  comments: mockCommonts,
};

/** 获取图片缩略图数据 */
const getImgThumbnail = (imgFile: HTMLImageElement, width = 20, height = 20) => {
  const imgWidth = imgFile.width;
  const imgHeight = imgFile.height;
  const square = Math.min(imgWidth, imgHeight);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(
    imgFile,
    (imgWidth - square) / 2,
    (imgHeight - square) / 2,
    square,
    square,
    0,
    0,
    width,
    height
  );
  return canvas.toDataURL('image/jpeg', 0.9);
};

/** 获取图片缩略图base64 */
export const getImgThumbnailData = (url: string) => {
  const img = new Image();
  // img.crossOrigin = 'anonymous'; // 设置允许外部来源
  img.onload = (v) => {
    const base64Data = getImgThumbnail(img, 20, 20);
    console.log(url, base64Data);
  };
  img.src = url;
};
