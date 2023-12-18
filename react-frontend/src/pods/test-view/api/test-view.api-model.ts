export interface TestEntityApi {
  name: string;
  data: [
    {
      idTest: string;
      porcentajeCorrecto: string;
      totalCorrecto: Number;
      totalError: Number;
      total: Number;
      fechaCalculo: string;
      activo: Boolean;
      duracionUltimaEjecucion: string;
      tags: string[];
      nombreTest: string;
      nombreRobot: string;
      errorUltimaEjecucion: Boolean;
    }
  ];
}
