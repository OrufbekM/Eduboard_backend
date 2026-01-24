module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "class_id",
        references: {
          model: "classes",
          key: "id",
        },
      },
    },
    {
      tableName: "lessons",
      timestamps: true,
    }
  );

  Lesson.associate = function(models) {
    Lesson.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class'
    });
  };

  return Lesson;
};
