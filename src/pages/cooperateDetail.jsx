import { Box, Typography, InputLabel, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";

const CooperateDetail = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetch(`https://plansbox.ir/api/Tender/GetById?id=${params.id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d.content);
        setIsLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading === false) return <Loader />;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: { sm: "wrap", xs: "nowrap" },
        gap: { sm: "5em", xs: "1em" },
        flexDirection: { sm: "row", xs: "column" },
        width: "10em",
        width: { sm: "100%", xs: "17em" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>نام شرکت متقاضی</InputLabel>
        <Typography>{data.name_Of_The_Applicant_Ccompany}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>شماره ثبت</InputLabel>
        <Typography>{data.registration_Number}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>کد ملی</InputLabel>
        <Typography>{data.national_Code}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>شماره شناسنامه</InputLabel>
        <Typography>{data.national_ID}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>کد اقتصادی</InputLabel>
        <Typography>{data.economic_Code}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>خدمات محصول</InputLabel>
        <Typography>{data.productService}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          شماره نامه درخواست همکاری
        </InputLabel>
        <Typography>{data.cooperation_Request_Letter_Number}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>آدرس وبسایت</InputLabel>
        <Typography>{data.address_WebSite}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>آدرس شرکت</InputLabel>
        <Typography>{data.address_Company}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>شماره تماس</InputLabel>
        <Typography>{data.phone_Number}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          نام و نام خانوادگی مدیرعامل
        </InputLabel>
        <Typography>{data.name_And_Surname_Of_The_CEO}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>نام کارخانه</InputLabel>
        <Typography>{data.factory_Name}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>آدرس کارخانه</InputLabel>
        <Typography>{data.factory_Address}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          پروژه شاخص سازمان تامین اجتماعی
        </InputLabel>
        <Typography>
          {data.flagship_Project_Of_The_Social_Security_Organization}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          پروژه شاخص درمانی که کالاها یا اجراها را فراهم می کند
        </InputLabel>
        <Typography>
          {data.the_Therapeutic_Index_Project_That_Provides_Goods_OrIimplements}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          شما تامین کننده مجاز کدام مجموعه دولتی هستید
        </InputLabel>
        <Typography>
          {data.which_Government_Collections_Are_You_An_Aauthorized_Supplier_Of}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          معرفی نامه و قدردانی
        </InputLabel>
        <Typography>{data.letter_Of_Introduction_And_Appreciation}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          استانداردهای اتخاذ شده
        </InputLabel>
        <Typography>{data.aadopted_Standards}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          داده ها، مجوزها و غیره
        </InputLabel>
        <Typography>{data.licenses_Etc}</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>تجربه</InputLabel>
        <Typography>{data.experience}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          ایمیل برای مکاتبات ضروری
        </InputLabel>
        <Typography>{data.email_For_Essential_Correspondence}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          آیا قبلا تامین کننده مجاز سازمان تامین اجتماعی بوده اید؟
        </InputLabel>
        <Checkbox
          disabled
          checked={
            data.have_You_Been_An_Authorized_Supplier_Of_The_Social_Security_Organization_Before
              ? true
              : false
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          آیا معرفی نامه یا تقدیرنامه در سازمان تامین اجتماعی دارید؟
        </InputLabel>
        <Checkbox
          disabled
          checked={
            data.do_You_Have_An_Introduction_Letter_Or_ALetter_Of_Aappreciation_Within_The_Social_Security_Organization
              ? true
              : false
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          آیا شما یک شرکت دانش بنیان هستید
        </InputLabel>

        <Checkbox
          disabled
          checked={data.are_You_A_Knowledge_Based_Company ? true : false}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".25em",

          p: 1,
          borderRadius: ".5em",
        }}
      >
        <InputLabel sx={{ fontWeight: "bold" }}>
          نمایندگی برندهای خارجی
        </InputLabel>

        <Checkbox
          disabled
          checked={data.representation_Of_Foreign_Brands ? true : false}
        />
      </Box>
    </Box>
  );
};

export default CooperateDetail;
