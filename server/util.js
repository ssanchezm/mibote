module.exports={
  createCallback:function(){
    var callback;
    var promise = new global.Promise(function(resolve, reject) {
      callback = function(err, data) {
        if (err) return reject(err);
        return resolve(data);
      };
    });
    callback.promise = promise;
    return cb;
  }
};
