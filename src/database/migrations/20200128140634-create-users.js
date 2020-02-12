module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.createTable('users', {
         id: {
         type:Sequelize.STRING,
         allowNull: false,
         primaryKey: true,
         default: Sequelize.fn('uuid_generate_v4'),

        },
        name: {
          type: Sequelize.STRING,
          allowNull:false,
          unique:true,
        },

        password_hash: {
          type: Sequelize.STRING,
          allowNull:false,
        },
        
        provide: {
          type:Sequelize.BOOLEAN,
          defaultValue:false,
          allowNull: false,
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull:false,
        },

        created_up: {
          type: Sequelize.DATE,
          allowNull:false,
        },


      });
  },

  down: (queryInterface, ) => {
         return queryInterface.dropTable('users');
    
  }
};
