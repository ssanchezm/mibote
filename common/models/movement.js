module.exports = function(Movement) {

  Movement.disableRemoteMethod('create',true);
  Movement.disableRemoteMethod('upsert',true);
  Movement.disableRemoteMethod('find',true);
  Movement.disableRemoteMethod('findOne',true);
  Movement.disableRemoteMethod('count',true);
  Movement.disableRemoteMethod("updateAll", true);
  Movement.disableRemoteMethod("updateAttributes", false);
  Movement.disableRemoteMethod("exists", true);
  Movement.disableRemoteMethod("deleteById", true);
  Movement.disableRemoteMethod('__create__members', false);
  Movement.disableRemoteMethod('__delete__members', false);
  Movement.disableRemoteMethod('__destroyById__members', false);
  Movement.disableRemoteMethod('__findById__members', false);
  Movement.disableRemoteMethod('__updateById__members', false);
  Movement.disableRemoteMethod('__count__members', false);
  Movement.disableRemoteMethod('__exists__members', false);
  Movement.disableRemoteMethod('__link__members', false);
  Movement.disableRemoteMethod('__unlink__members', false);
  Movement.disableRemoteMethod('createChangeStream', true);

};
