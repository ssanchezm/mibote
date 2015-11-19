module.exports = function(Account) {

  Account.disableRemoteMethod('upsert',true);
  Account.disableRemoteMethod('findOne',true);
  Account.disableRemoteMethod('count',true);
  Account.disableRemoteMethod("exists", true);
  Account.disableRemoteMethod("updateAll", true);
  Account.disableRemoteMethod("deleteById", true);
  Account.disableRemoteMethod('__create__accessTokens', false);
  Account.disableRemoteMethod('__get__accessTokens', false);
  Account.disableRemoteMethod('__count__accessTokens', false);
  Account.disableRemoteMethod('__delete__accessTokens', false);
  Account.disableRemoteMethod('__destroyById__accessTokens', false);
  Account.disableRemoteMethod('__findById__accessTokens', false);
  Account.disableRemoteMethod('__updateById__accessTokens', false);
  Account.disableRemoteMethod('__exists__accessTokens', false);
  Account.disableRemoteMethod('__link__accessTokens', false);
  Account.disableRemoteMethod('__unlink__accessTokens', false);
  Account.disableRemoteMethod('__findById__tins', false);
  Account.disableRemoteMethod('__updateById__tins', false);
  Account.disableRemoteMethod('__destroyById__tins', false);
  Account.disableRemoteMethod('__count__tins', false);
  Account.disableRemoteMethod('__delete__tins', false);
  Account.disableRemoteMethod('__exists__tins', false);
  Account.disableRemoteMethod('__link__tins', false);
  Account.disableRemoteMethod('__unlink__tins', false);
  Account.disableRemoteMethod('createChangeStream', true);


};
