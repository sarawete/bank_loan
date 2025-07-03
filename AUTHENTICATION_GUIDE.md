# Guide d'Authentification - Bank Loan Application

## Vue d'ensemble du système d'authentification

L'application utilise un système d'authentification basé sur les cookies avec les composants suivants :

### 1. Fichiers principaux

- **`/lib/auth.ts`** : Fonctions utilitaires pour l'authentification
- **`/middleware.ts`** : Middleware pour protéger les routes
- **`/hooks/use-auth.ts`** : Hook personnalisé pour l'authentification côté client
- **`/app/api/auth/login/route.ts`** : API de connexion
- **`/app/api/auth/logout/route.ts`** : API de déconnexion

### 2. Comment l'utilisateur connecté est identifié/stocké

#### Côté serveur (Server-Side)
- **Cookie `user_session`** : Cookie httpOnly contenant les données de session
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user|administrator"
  }
  ```

#### Côté client (Client-Side)
- **Cookie `user_role`** : Cookie accessible par JavaScript contenant le rôle
- **`localStorage['user_data']`** : Données utilisateur stockées localement
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user|administrator"
  }
  ```

### 3. Comment récupérer l'ID de l'utilisateur connecté

#### Côté serveur (Dans les API Routes)
```typescript
import { getCurrentUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser()
  
  if (!currentUser) {
    return NextResponse.json(
      { success: false, message: 'User not authenticated' },
      { status: 401 }
    )
  }
  
  // Utiliser currentUser.id, currentUser.email, currentUser.role
  console.log('User ID:', currentUser.id)
}
```

#### Côté client (Dans les composants React)
```typescript
import { useAuth } from '@/hooks/use-auth'

function MyComponent() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Please login</div>
  }
  
  // Utiliser user.id, user.email, user.role
  console.log('User ID:', user.id)
  
  return <div>Welcome {user.email}</div>
}
```

### 4. Hook personnalisé useAuth

Le hook `useAuth` fournit :
- `user`: Données de l'utilisateur connecté
- `loading`: État de chargement
- `isAuthenticated`: Booléen indiquant si l'utilisateur est connecté
- `isAdmin`: Booléen indiquant si l'utilisateur est administrateur
- `logout`: Fonction pour déconnecter l'utilisateur

### 5. Intégration avec les soumissions de prêts

L'API `/api/submissions` a été mise à jour pour :
- Vérifier l'authentification de l'utilisateur
- Ajouter automatiquement `userId` et `userEmail` aux soumissions
- Filtrer les soumissions par utilisateur (les utilisateurs voient seulement leurs soumissions)
- Permettre aux administrateurs de voir toutes les soumissions

#### Structure des soumissions avec authentification
```json
{
  "id": "submission_id",
  "submittedAt": "2025-07-01T12:00:00.000Z",
  "status": "pending",
  "userId": "user_id",
  "userEmail": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  // ... autres données du formulaire
}
```

### 6. Exemple d'utilisation complète

```typescript
// Dans un composant
import { useAuth } from '@/hooks/use-auth'

export function LoanSubmissionForm() {
  const { user, isAuthenticated } = useAuth()
  
  const handleSubmit = async (formData: any) => {
    if (!isAuthenticated) {
      alert('Please login to submit a loan application.')
      return
    }
    
    // L'API ajoutera automatiquement userId et userEmail
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    
    const result = await response.json()
    if (result.success) {
      console.log('Submission saved with user ID:', user.id)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Formulaire */}
    </form>
  )
}
```

### 7. Sécurité

- Les mots de passe sont hashés avec bcrypt
- Les cookies de session sont httpOnly et sécurisés
- Le middleware protège les routes sensibles
- L'authentification est vérifiée côté serveur pour toutes les API

### 8. Rôles d'utilisateur

- **`user`** : Utilisateur normal (peut voir ses propres soumissions)
- **`administrator`** : Administrateur (peut voir toutes les soumissions)

Le système est maintenant prêt pour l'association automatique des soumissions aux utilisateurs connectés.