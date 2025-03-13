import { Observable } from 'rxjs';

interface userById {
  id: number;
}

interface message {
  message: string
}

export interface NotificationService {
  GetUser(data: userById): Observable<message>;
}