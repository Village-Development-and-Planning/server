import Artifact from '../../../models/Artifact';

module.exports = {
  tagPrefix: 'IMG_',
  adorn(tag, obj, warnings) {
    const name = tag.slice(4);
    return Artifact.findOne({name, type: 'image'}).then(
      (art) => {
        if (art) {
          obj.image = {
            data: art.data.toString('base64'),
            mimeType: art.mimeType,
          };
        } else {
          warnings.push({message: `Unknown image: ${name} (tag=${tag}`});
        }
        return obj;
      }
    );
  },
};
