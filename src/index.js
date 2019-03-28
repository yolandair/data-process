var imageCutUrl = require("@buss/image-cut-url");
var ComputationTime = require("@cnpm/computation-time");

var DataProcess = function(options) {
  var T = this;

  this.objectItem = {
    SourceUrl: function(item) {
      return item.SourceUrl || item.WapUrl;
    },
    WapUrl: function(item) {
      return item.WapUrl || item.SourceUrl;
    },
    PreviewImage: function(item) {
      if (!item.PreviewImage) return "";
      if (T.defaults.imgCutUrl) {
        return imageCutUrl.init(
          item.PreviewImage,
          T.defaults.imgCutUrl.width,
          T.defaults.imgCutUrl.height,
          T.defaults.imgCutUrl.type
        );
      } else {
        return item.PreviewImage;
      }
    },
    Images: function(item) {
      if (!item.Images) return "";
      if (typeof item.Images == "string") {
        try {
          var imgs = JSON.parse(item.Images).map(function(e) {
            if (e.imageUrl) {
              if (T.defaults.imgCutUrl) {
                return imageCutUrl.init(
                  e.imageUrl,
                  T.defaults.imgCutUrl.width,
                  T.defaults.imgCutUrl.height,
                  T.defaults.imgCutUrl.type
                );
              } else {
                return e.imageUrl;
              }
            } else {
              return;
            }
          });
          return imgs;
        } catch (e) {
          return "";
        }
      } else if (typeof item.Images == "object") {
        var imgs = item.Images.map(function(e) {
          if (T.defaults.imgCutUrl) {
            return imageCutUrl.init(
              e.imageUrl,
              T.defaults.imgCutUrl.width,
              T.defaults.imgCutUrl.height,
              T.defaults.imgCutUrl.type
            );
          } else {
            return e.imageUrl;
          }
        });
        return imgs;
      }
    },
    BreviaryImage: function(item) {
      if (!item.BreviaryImage) return "";
      if (typeof item.BreviaryImage == "string") {
        try {
          var imgs = JSON.parse(item.BreviaryImage)
          return imgs;
        } catch (e) {
          return "";
        }
      } else if (typeof item.BreviaryImage == "object") {
          var imgs = item.BreviaryImage;
        return imgs;
      }
    },
    _id: function(item) {
      return item._id || "";
    },
    TitleCN: function(item) {
      return item.TitleCN || "";
    },
    TitleEN: function(item) {
      return item.TitleEN || "";
    },
    Summary: function(item) {
      return item.Summary || "";
    },
    Sign: function(item) {
      return item.Sign || "";
    },
    SourceName: function(item) {
      return item.SourceName || "";
    },
    PublishedAt: function(item) {
      return item.PublishedAt || "";
    },
    SyncType: function(item) {
      return item.SyncType || "";
    },
    TotalTime: function(item) {
      return item.TotalTime ? ComputationTime.transSeconds(item.TotalTime) : "";
    },
    Fvideo: function(item) {
      return item.Fvideo || "";
    },
    OuterPlayerUrl: function(item) {
      return item.OuterPlayerUrl || "";
    },
    Album: function(item) {
      if (!item.Album) return "";

      if (typeof item.Album == "string") {
        return JSON.parse(item.Album);
      } else if (typeof item.Album == "object") {
        return item.Album;
      }
    },
    Headline1: function(item) {
      return item.Headline1 || "";
    },
    City: function(item) {
      return item.City || "";
    }
  };

  this.defaults = {
    objectItem: this.objectItem,
    dataArr: []
  };

  this.defaults = $.extend(true, this.defaults, options);

  var newDataArr = this.defaults.dataArr.map(function(item) {
    return Object.keys(item).reduce(function(acc, key) {
      if (!T.objectItem[key]) {
        return acc;
      }
      acc[key] = T.objectItem[key].call(T, item);
      return acc;
    }, {});
  });
  return newDataArr;
};
module.exports = DataProcess;
