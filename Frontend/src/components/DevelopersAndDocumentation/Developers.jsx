import React from 'react';
import { Box, Typography, Avatar, Grid, Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';

const developers = [
  {
    name: "Tanush M M",
    role: "Lead Backend Engineer and Data Scientist",
    skills: ["Python [Flask, SciKit-Learn, Seaborn]", "MongoDB", "Docker", "Cloud - AWS", "Git", "SQL", "Java", "Machine Learning"],
    description: "Tanush is an expert in backend engineering and data science, specializing in building scalable systems and optimizing performance. With extensive experience in cloud platforms like AWS, he ensures seamless deployment and management of complex applications.",
    portfolio: "https://tanushmm.github.io/tanush-portfolio/",
    image: "https://rideshare-s3.s3.ap-south-1.amazonaws.com/Tanush_Latest.JPG"
  },
  {
    name: "Sirasudeen P",
    role: "Fullstack Developer",
    skills: ["React", "Node.js", "MUI", "MongoDB", "Cloud - AWS"],
    description: "Sirasudeen is a versatile fullstack developer with a strong background in frontend and backend technologies. He brings complex ideas to life with efficient, well-architected solutions while ensuring a smooth and intuitive user experience.",
    portfolio: "https://www.linkedin.com/in/sirasudeen-p-4512b4221/",
    image: "https://rideshare-s3.s3.ap-south-1.amazonaws.com/Sirasudeen_Latest.jpg"
  }
];

const Developers = () => {
  const fadeInAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 220, friction: 30 },
    delay: 300,
  });

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.heading}>
        Meet the Developers
      </Typography>
      <Grid container spacing={4} sx={styles.gridContainer}>
        {developers.map((dev, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <animated.div style={fadeInAnimation}>
              <Box sx={styles.devCard}>
                <Avatar src={dev.image} alt={dev.name} sx={styles.avatar} />
                <Typography variant="h6" sx={styles.devName}>{dev.name}</Typography>
                <Typography variant="subtitle1" sx={styles.devRole}>{dev.role}</Typography>
                <Typography variant="body2" sx={styles.description}>{dev.description}</Typography>
                <Typography variant="body2" sx={styles.skills}>
                  Expertise: {dev.skills.join(', ')}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={dev.portfolio}
                  target="_blank"
                  sx={styles.portfolioButton}
                >
                  Explore Portfolio
                </Button>
              </Box>
            </animated.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    padding: '4rem 2rem',
    backgroundColor: '#b0bec5',
    textAlign: 'center',
    marginTop: '75px'
  },
  heading: {
    marginBottom: '3rem',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    color: '#052f54',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  devCard: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  avatar: {
    width: '250px',       
    height: '250px',      
    margin: 'auto',       
    marginBottom: '1rem',
    borderRadius: '50%',  
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', 
  },
  devName: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
  },
  devRole: {
    color: '#405D72',
    marginBottom: '1rem',
    fontSize: '1.2rem',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '1rem',
    lineHeight: '1.6',
  },
  skills: {
    marginBottom: '1rem',
    fontStyle: 'italic',
    fontSize: '1rem',
  },
  portfolioButton: {
    backgroundColor: '#405D72',
    '&:hover': {
      backgroundColor: '#052f54',
    },
  },
};

export default Developers;
