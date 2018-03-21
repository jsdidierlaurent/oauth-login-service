module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('tbl_account_users', {
    user_uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    user_nickname: DataTypes.STRING,
    user_rights: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    }
  }, {
    timestamps: false,
  })

  return Model
}