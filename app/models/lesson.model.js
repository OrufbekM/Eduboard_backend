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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "image",
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "video",
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "text",
      },
    },
    {
      tableName: "lessons",
      timestamps: true,
    }
  );

  Lesson.associate = function(models) {
    Lesson.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Lesson.belongsTo(models.Class, {
      foreignKey: 'classId',
      as: 'class'
    });
    Lesson.hasMany(models.LessonMedia, {
      foreignKey: 'lessonId',
      as: 'media'
    });
  };

  return Lesson;
};
