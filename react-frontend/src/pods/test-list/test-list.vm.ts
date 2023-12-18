/*export interface Employee {
  id: string;
  isActive: boolean;
  name: string;
  email: string;
  lastDateIncurred: string;
}*/

export interface TestEntity {
  name: string;
  data: [SingleTestEntity];
}

export interface SingleTestEntity {
  idTest: string;
  porcentajeCorrecto: string;
  totalCorrecto: Number;
  totalError: Number;
  total: Number;
  fechaCalculo: string;
  activo: Boolean;
  fechaUltimaEjecucion: string;
  duracionUltimaEjecucion: string;
  tags: string[];
  nombreTest: string;
  nombreRobot: string;
  errorUltimaEjecucion: Boolean;
}
