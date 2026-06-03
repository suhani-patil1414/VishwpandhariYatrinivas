
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");
// const twilio = require("twilio");
// const https = require("https");

const app = express();

// ================= TWILIO =================

// const accountSid = process.env.TWILIO_ACCOUNT_SID;

// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = twilio(accountSid, authToken);

// const twilioNumber = process.env.TWILIO_PHONE;

app.use(cors());
// app.use(express.json());
app.use(express.json({
  limit: "50mb"
}));

app.use(express.urlencoded({
  extended: true,
  limit: "50mb"
}));
// app.use(express.urlencoded({ extended: true })); // 🔥 IMPORTANT

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS

  },

  tls: {
    rejectUnauthorized: false
  }

});


// ✅ DB CONNECTION (POOL BEST)
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vishwpandhari_yatrinivas"
});

// ================= REGISTER =================
app.post("/register", (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.send({ success: false, message: "All fields required ❌" });
  }

  const checkSql = "SELECT * FROM users WHERE email=?";
  
  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ success: false, message: "DB error ❌" });
    }

    if (result.length > 0) {
      return res.send({ success: false, message: "User already exists ❌" });
    }

    const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [name, email, password, phone], (err, result) => {
      if (err) {
        console.log("INSERT ERROR:", err);
        return res.send({ success: false, message: "Register failed ❌" });
      }

      console.log("User Inserted ✅");
      res.send({ success: true, message: "User Registered ✅" });
    });
  });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN DATA:", email, password); // 👈 ADD THIS

  if (email === "admin@gmail.com" && password === "12345") {
    console.log("ADMIN LOGIN HIT ✅"); // 👈 ADD THIS

    return res.send({
      success: true,
      role: "admin"
    });
  }

  const sql = "SELECT * FROM users WHERE email=? AND password=?";
  
  db.query(sql, [email, password], (err, result) => {
    console.log("USER QUERY RESULT:", result); // 👈 ADD THIS

    if (result.length > 0) {
      res.send({
        success: true,
        role: "user",
        user: result[0]
      });
    } else {
      res.send({
        success: false,
        message: "Invalid Credentials ❌"
      });
    }
  });
});


// ================= BOOKING =================
app.post("/book", (req, res) => {
  const { name, email, room_type, check_in, check_out, guests } = req.body;

  if (!name || !email || !room_type || !check_in) {
    return res.send({ success: false, message: "Missing fields ❌" });
  }

  const sql = `
    INSERT INTO bookings 
    (name, email, room_type, check_in, check_out, guests) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, room_type, check_in, check_out, guests], (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ success: false, message: "Booking failed ❌" });
    }

    res.send({
      success: true,
      message: "Booking Confirmed ✅",
      bookingId: result.insertId
    });
  });
});


// ================= ADMIN ADDED ROOMS =================
// app.post("/admin/add-room", (req, res) => {

//   console.log("BODY:", req.body); // 👈 🔥 इथे add कर

//   const { room_type, price, total_rooms, image } = req.body;

//   if (!room_type || !price || !total_rooms || !image) {
//     return res.send({ success: false, message: "All fields required ❌" });
//   }

//   const sql = `
//     INSERT INTO rooms (room_type, price, total_rooms, image)
//     VALUES (?, ?, ?, ?)
//   `;

//   db.query(sql, [room_type, price, total_rooms, image], (err, result) => {
//     if (err) {
//       console.log("DB ERROR:", err); // 👈 extra debug
//       return res.send({ success: false });
//     }

//     res.send({ success: true, message: "Room Added ✅" });
//   });
// });

app.post("/admin/add-room", (req, res) => {

  console.log("BODY:", req.body);

  const { room_type, price, total_rooms, image, description } = req.body; // ✅ NEW

  // validation
  if (!room_type || !price || !total_rooms || !image || !description) {
    return res.send({ success: false, message: "All fields required ❌" });
  }

  const sql = `
    INSERT INTO rooms (room_type, price, total_rooms, image, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [room_type, price, total_rooms, image, description], // ✅ NEW
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.send({ success: false });
      }

      res.send({ success: true, message: "Room Added ✅" });
    }
  );
});


// ================= GET ALL ROOMS =================
app.get("/rooms", (req, res) => {
  const sql = "SELECT * FROM rooms";

  db.query(sql, (err, result) => {
    if (err) return res.send({ success: false });

    res.send({ success: true, data: result });
  });
});


// ================= DELETE ROOMS=================
app.delete("/admin/delete-room/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM rooms WHERE id=?", [id], (err, result) => {
    if (err) return res.send({ success: false });

    res.send({ success: true, message: "Room Deleted ✅" });
  });
});




app.put("/admin/update-room/:id", (req, res) => {
  const id = req.params.id;

  const { room_type, price, total_rooms, image, description } = req.body; // ✅ ADD

  const sql = `
    UPDATE rooms 
    SET room_type=?, price=?, total_rooms=?, image=?, description=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [room_type, price, total_rooms, image, description, id], // ✅ ADD
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send({ success: false });
      }

      res.send({ success: true });
    }
  );
});

// ================= GET BOOKINGS =================
// ================= BOOK ROOM =================
app.post("/book-room", (req, res) => {
  const {
    user_id,
    user_name,
    email,
    phone,
    room_id,
    room_type,
    price,
    check_in,
    check_in_time,
    check_out,
    check_out_time,
    guests
  } = req.body;

  const sql = `
  INSERT INTO bookings 
  (user_id, user_name, email, phone, room_id, room_type, price, check_in, check_in_time, check_out, check_out_time, guests)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(sql,
  [
    user_id,
    user_name,
    email,
    phone,
    room_id,
    room_type,
    price,
    check_in,
    check_in_time,
    check_out,
    check_out_time,
    guests
  ],

  (err, result) => {

    if (err) {
      console.log("DB ERROR:", err);
      return res.send({ success: false });
    }

    // ✅ EMAIL
    sendEmail(email, user_name, {
      room_id,
      room_type,
      price,
      phone,
      check_in,
      check_in_time,
      check_out,
      check_out_time,
      guests
    });

    // ================= SMS =================

// sendSMS(

//   phone,

// `🏨 Vishwpandhari Yatrinivas

// Hello ${user_name} 👋

// Your room booking is confirmed ✅

// 📌 Booking Details:

// 🆔 Room ID: ${room_id}

// 🛏 Room Type: ${room_type}

// 💰 Price: ₹${price}

// 📅 Check-In Date: ${check_in}

// 🕒 Check-In Time: ${check_in_time}

// 📅 Check-Out Date: ${check_out}

// 🕒 Check-Out Time: ${check_out_time}

// 👥 Guests: ${guests}

// 📞 Phone: ${phone}

// 📧 Email: ${email}

// 🙏 Thank you for choosing Vishwpandhari Yatrinivas.

// We wish you a comfortable stay 🏨`

// );

    res.send({ success: true });

  }
);
});


// ================= SEND SMS =================

// async function sendSMS(to, message) {

//   try {

//     const sms = await client.messages.create({

//       body: message,

//       from: twilioNumber,

//       to: `+91${to}`

//     });

//     console.log("SMS SENT ✅", sms.sid);

//   } catch (err) {

//     console.log("SMS ERROR ❌", err.message);

//   }

// }


function sendEmail(to, name, booking) {

  const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS

  },

  tls: {

    rejectUnauthorized: false

  }

});

  const mailOptions = {

    from: "suhanipatil1414@gmail.com",

    to: to,

    subject: "Room Booking Confirmed 🏨",

    html: `

      <h2>Hello ${name} 👋</h2>

      <p>
        Your room booking is confirmed ✅
      </p>

      <h3>📌 Booking Details:</h3>

      <p>
        <b>Room:</b>
        ${booking.room_type}
      </p>

      <p>
        <b>Price:</b>
        ₹${booking.price}
      </p>

      <p>
        <b>Phone:</b>
        ${booking.phone}
      </p>

      <p>
        <b>Check-In:</b>
        ${booking.check_in}
        at
        ${booking.check_in_time}
      </p>

      <p>
        <b>Check-Out:</b>
        ${booking.check_out}
        at
        ${booking.check_out_time}
      </p>

      <p>
        <b>Guests:</b>
        ${booking.guests}
      </p>

      <p>
        Thank you for choosing
        Vishwpandhari Yatrinivas 🙏
      </p>

    `
  };

  transporter.sendMail(mailOptions, (err, info) => {

    if (err) {

      console.log("EMAIL ERROR:", err);

    } else {

      console.log("EMAIL SENT ✅");

      console.log(info.response);

    }

  });

}

app.get("/all-bookings", (req, res) => {
  const sql = "SELECT * FROM bookings";

  db.query(sql, (err, result) => {
    if (err) return res.send({ success: false });

    res.send({ success: true, data: result });
  });
});



// ================= CANCEL BOOKINGS  =================
app.delete("/cancel-booking/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) return res.send({ success: false });

    res.send({ success: true });
  });
});

// ================= GET USER BOOKINGS =================
app.get("/my-bookings/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM bookings WHERE user_id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      data: result   // ✅ FIX
    });
  });
});

// ================= ROOM AVAILABILITY =================
app.get("/room-availability/:room_id", (req, res) => {
  const roomId = req.params.room_id;
  const { check_in, check_out } = req.query;

  // ❌ जर date नाही दिले तर simple count
  if (!check_in || !check_out) {
    const sql = `
      SELECT r.total_rooms,
             COUNT(b.id) as booked
      FROM rooms r
      LEFT JOIN bookings b ON r.id = b.room_id
      WHERE r.id = ?
      GROUP BY r.id
    `;

    db.query(sql, [roomId], (err, result) => {
      const total = result[0].total_rooms;
      const booked = result[0].booked;

      res.send({
        total,
        booked,
        available: total - booked,
        booked_dates: "Select dates to see"
      });
    });

    return;
  }

  // ✅ DATE WISE CHECK
  const sql = `
    SELECT 
      r.total_rooms,
      COUNT(b.id) as booked,
      GROUP_CONCAT(
        CONCAT(DATE(b.check_in), ' to ', DATE(b.check_out))
        SEPARATOR '<br>'
      ) as booked_dates
    FROM rooms r
    LEFT JOIN bookings b 
      ON r.id = b.room_id
      AND (
        b.check_in <= ? AND b.check_out >= ?
      )
    WHERE r.id = ?
    GROUP BY r.id
  `;

  db.query(sql, [check_out, check_in, roomId], (err, result) => {
    const total = result[0].total_rooms;
    const booked = result[0].booked;

    res.send({
      total,
      booked,
      available: total - booked,
      booked_dates: result[0].booked_dates || "No bookings"
    });
  });
});

// ================= ADMIN SHOW BOOKINGS =================
app.get("/all-bookings", (req, res) => {
  const sql = "SELECT * FROM bookings ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) return res.send([]);
    res.send(result);
  });
});

// ================= ADMIN UPDATE BOOKINGS =================
app.put("/update-booking/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  const sql = "UPDATE bookings SET status=? WHERE id=?";

  db.query(sql, [status, id], (err) => {
    if (err) return res.send({ success: false });

    res.send({ success: true });
  });
});

// ================= ADMIN USERS =================
app.get("/all-users", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result); // ✅ IMPORTANT
  });
});

// ================= ADMIN DELETE USERS =================
app.delete("/delete-user/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send({ success: false });
    }

    res.send({ success: true });
  });
});

// ================= TESTIMONIAL =================
app.get("/testimonials", (req, res) => {
  const sql = "SELECT * FROM testimonials ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) return res.send({ success: false });

    res.send({ success: true, data: result });
  });
});

// ================= TESTIMONIAL =================
app.post("/add-testimonial", (req, res) => {

  console.log(req.body);

  const {
    name,
    location,
    message,
    rating,
    image
  } = req.body;

  const sql = `
    INSERT INTO testimonials
    (name, location, message, rating, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, location, message, rating, image],

    (err, result) => {

      if (err) {
        console.log("DB ERROR:", err);

        return res.send({
          success: false
        });
      }

      console.log("Inserted ✅");

      res.send({
        success: true
      });

    }
  );

});

// DELETE TESTIMONIAL
app.delete("/delete-testimonial/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM testimonials WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.log(err);
      return res.send({ success: false });
    }

    res.send({ success: true });

  });

});


app.post("/add-enquiry", (req, res) => {

  const {
    full_name,
    phone,
    email,
    checkin_date,
    room_type,
    message
  } = req.body;

  const sql = `
    INSERT INTO enquiries
    (
      full_name,
      phone,
      email,
      checkin_date,
      room_type,
      message
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      full_name,
      phone,
      email,
      checkin_date,
      room_type,
      message
    ],
    (err, result) => {

      if(err){

        console.log(err);

        return res.send({
          success:false
        });

      }

      res.send({
        success:true
      });

    }
  );

});


// ================= ALL ENQUIRIES =================

app.get("/all-enquiries", (req, res) => {

  const sql = "SELECT * FROM enquiries ORDER BY id DESC";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.send([]);

    }

    res.send(result);

  });

});

// ================= APPROVE ENQUIRY =================

app.put("/approve-enquiry/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM enquiries WHERE id=?",
    [id],
    (err, data) => {

      if (err || data.length === 0) {

        return res.send({
          success: false
        });

      }

      const user = data[0];

      // ================= EMAIL =================

      const mailOptions = {

        from: process.env.EMAIL_USER,

        to: user.email,

        subject: "Room Enquiry Approved ✅",

        html: `

          <h2>Hello ${user.full_name}</h2>

          <p>
            Your enquiry for
            <b>${user.room_type}</b>
            has been approved ✅
          </p>

          <p>
            Check-In Date:
            ${user.checkin_date}
          </p>

          <p>
            Thank you for contacting
            Vishwpandhari Yatrinivas.
          </p>

        `
      };

      transporter.sendMail(mailOptions);

      // ================= DELETE =================

      db.query(
        "DELETE FROM enquiries WHERE id=?",
        [id],
        (delErr) => {

          if (delErr) {

            return res.send({
              success: false
            });

          }

          res.send({
            success: true
          });

        });

    });

});



// ================= DELETE / REJECT ENQUIRY =================

app.delete("/delete-enquiry/:id", (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM enquiries WHERE id=?",
    [id],
    (err, data) => {

      if (err || data.length === 0) {

        console.log(err);

        return res.send({
          success: false
        });

      }

      const user = data[0];

      // ================= EMAIL =================

      const mailOptions = {

        from: process.env.EMAIL_USER,

        to: user.email,

        subject: "Room Enquiry Rejected ❌",

        html: `

          <h2>Hello ${user.full_name}</h2>

          <p>
            Sorry, your enquiry for
            <b>${user.room_type}</b>
            has been rejected ❌
          </p>

          <p>
            Please contact us again.
          </p>

          <p>
            Vishwpandhari Yatrinivas
          </p>

        `
      };

      // SEND MAIL
      transporter.sendMail(mailOptions);

      console.log("REJECT MAIL SENT ✅");

      // ================= DELETE =================

      db.query(
        "DELETE FROM enquiries WHERE id=?",
        [id],
        (delErr) => {

          if (delErr) {

            console.log(delErr);

            return res.send({
              success: false
            });

          }

          res.send({
            success: true
          });

        });

    });

});


// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000 🚀");
});