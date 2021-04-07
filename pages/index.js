import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Layout from '../components/layout';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import { CardHeader } from '@material-ui/core';
import MD5 from 'crypto-js/md5';

export default function Home({ chars, data }) {
  return (
    <Layout home>
      <main>
        <Grid container spacing={2} direction='row'>
          {chars.map((value) => (
            <Grid key={value.name} item xs={4} style={{ display: 'flex' }}>
              <Card style={{ width: '100%' }}>
                <CardHeader title={value.name} />
                <CardContent>
                  <Image
                    src={`${value.thumbnail.path}.${value.thumbnail.extension}`}
                    height={180}
                    width={180}
                  />
                  <p>{value.description}</p>
                </CardContent>
                <CardActions>
                  <Button size='small'>See More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const ts = Date.now()
  const hash = MD5(ts+process.env.PRIVATE_KEY+process.env.PUBLIC_KEY).toString()
  const data = await axios.get(
    'https://gateway.marvel.com/v1/public/characters',
    {
      params: {
        ts: ts,
        apikey: process.env.PUBLIC_KEY,
        hash: hash,
      },
    }
  );
  return {
    props: {
      chars: data.data.data.results,
      data: data.data,
    },
  };
}
