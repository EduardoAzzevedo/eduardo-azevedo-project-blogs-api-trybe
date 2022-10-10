'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'blog_posts',
          key: id,
        },
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'post_id',
      },
      categoryId: {
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
          key: id,
        },
        primaryKey: true,
        type: Sequelize.INTEGER,
        field: 'category_id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
await queryInterface.dropTable('posts_categories');
  }
};
