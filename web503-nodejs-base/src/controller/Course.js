import Joi from "joi";
import Course from "../model/Course";

const createShema = Joi.object({
  courseName: Joi.string().required(),
  views: Joi.number().required().min(1),
  thumbnail: Joi.string().required().uri(),
  note: Joi.string().optional(),
  category: Joi.string().required(),
});

export async function getAll(req, res) {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.json(error.message);
  }
}
export async function create(req, res) {
  try {
    const { error } = createShema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.json({
        message: "Error",
        details: error.details.map((item) => item.message),
      });
    }
    const course = await Course.create(req.body);
    res.json(course);
  } catch (error) {
    res.json(error.message);
  }
}
export async function getById(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.json("Khong tim thay");
    }
    res.json(course);
  } catch (error) {
    res.json(error.message);
  }
}
export async function updateById(req, res) {
  try {
    const { error } = createShema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.json({
        message: "Error",
        details: error.details.map((item) => item.message),
      });
    }
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.json("Khong tim thay");
    }
    res.json(course);
  } catch (error) {
    res.json(error.message);
  }
}
export async function deleteById(req, res) {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.json("Khong tim thay");
    }
    res.json("xoa thanh cong");
  } catch (error) {
    res.json(error.message);
  }
}
