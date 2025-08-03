import { Link } from 'react-router-dom'
import { type Livro } from '../types/models'
import { motion } from 'framer-motion'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Rating
} from '@mui/material'

interface LivroCardProps {
  livro: Livro
  index: number
}

const LivroCard = ({ livro, index }: LivroCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    style={{ height: '100%' }}
  >
    <Card
      sx={{
        maxWidth: 260,
        width: '100%',
        mx: 'auto',
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)'
        }
      }}
    >
      <CardActionArea
        component={Link}
        to={`/livro/${livro.id}`}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          image={
            livro.capaUrl ||
            'https://via.placeholder.com/400x600.png?text=Sem+Capa'
          }
          alt={`Capa de ${livro.titulo}`}
          sx={{
            aspectRatio: '2/3',
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <CardContent
          sx={{
            textAlign: 'left',
            width: '100%',
            pt: 1,
            pb: '16px !important'
          }}
        >
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            noWrap
            sx={{ fontWeight: 'bold' }}
          >
            {livro.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {livro.autor}
          </Typography>
          <Rating
            name="read-only"
            value={livro.nota || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ mt: 0.5 }}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  </motion.div>
)

export default LivroCard
