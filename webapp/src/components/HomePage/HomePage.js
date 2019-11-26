import React from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, CssBaseline,
         Grid, Typography, Container, makeStyles } from '@material-ui/core';
import Footer from "../Footer/Footer";

const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const cards = [1, 2, 3];

export default function Album() {
    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Art Blockchain
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Achetez ou mettez en vente des oeuvres d'art de façon sécurisée grâce à "Art Blockchain", le
                            nouveau service en ligne de vente d'oeuvres d'arts utilisant la blockchain Ethereum pour
                            enregistrer et prouver la possession d'une oeuvre.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Parcourir les ventes
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Mettre en vente
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom
                                className={"titleTrending"}>
                        Populaires en ce moment
                    </Typography>
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Nom de l'oeuvre
                                        </Typography>
                                        <Typography>
                                            Description de l'oeuvre
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Voir
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Footer/>
        </>
    );
}