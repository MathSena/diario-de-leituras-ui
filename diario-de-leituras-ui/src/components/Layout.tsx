import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  InputAdornment
} from '@mui/material'
import { Outlet, Link, useLocation, useOutletContext } from 'react-router-dom'
import BookIcon from '@mui/icons-material/Book'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

type AppContextType = {
  termoBusca: string
  setTermoBusca: (termo: string) => void
} | null

const Layout = () => {
  const context = useOutletContext<AppContextType>()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: 'auto'
      }}
    >
      {/* ---------- TOPO ---------- */}
      <AppBar
        position="static"
        elevation={1}
        sx={{ bgcolor: 'background.paper' }}
      >
        <Container
          maxWidth={false}
          disableGutters
          sx={{ px: { xs: 2, md: 4 } }}
        >
          <Toolbar disableGutters>
            <BookIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
            >
              Diário de Leituras
            </Typography>

            {isHomePage && context && (
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Buscar livros..."
                  value={context.termoBusca}
                  onChange={e => context.setTermoBusca(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      '& fieldset': { borderColor: 'transparent' },
                      '&:hover fieldset': { borderColor: 'grey.700' }
                    },
                    input: { color: 'white' }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'grey.400' }} />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  component={Link}
                  to="/adicionar"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* ---------- CONTEÚDO ---------- */}
      <Container
        component="main"
        maxWidth={false}
        disableGutters
        sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 4 } }}
      >
        <Outlet context={context} />
      </Container>

      {/* ---------- RODAPÉ ---------- */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: 'center',
          bgcolor: 'background.paper',
          color: 'text.secondary',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Diário de Leituras. Gerencie sua
          biblioteca com facilidade.
        </Typography>
      </Box>
    </Box>
  )
}

export default Layout
