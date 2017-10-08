import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  storagePath: '/data/uploads',
  downloadRoute: '/uploads',
  collectionName: 'images',
  allowClientCode: true,
});

export default Images;
