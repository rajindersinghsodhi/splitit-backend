const getUsers = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will give you data of all users"
        }
    );
};

const getUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will give you data of requested user"
        }
    );
};


const addUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will add data of requested user"
        }
    );
};

const updateUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will update data of requested user"
        }
    );
};

const deleteUser = (req, res) => {
    res.status(200).json(
        {
            "status": "success",
            "message": "I will delete data of requested user"
        }
    );
};

export { getUser, getUsers, addUser, deleteUser, updateUser };