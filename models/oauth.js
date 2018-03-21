module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('tbl_account_oauths', {
      oauth_id     : {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      oauth_provider: {
        type: DataTypes.STRING(20),
        primaryKey: true
      },
      oauth_access_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      oauth_email: DataTypes.STRING,
      oauth_name: DataTypes.STRING
  }, {
    timestamps: false,
  });

  Model.associate = function(models){
    this.tbl_account_oauths = this.belongsTo(models.tbl_account_users, {
      foreignKey: 'oauth_user_uid'
    });
  };

  return Model;
};