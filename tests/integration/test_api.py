import unittest
from pathlib import Path
from shutil import copyfile
from tempfile import TemporaryDirectory

from backend.app import create_app


class ApiTestCase(unittest.TestCase):
    def setUp(self):
        self.client = create_app().test_client()

    def test_health(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json()["status"], "ok")

    def test_index_serves_frontend(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Comunidades quilombolas", response.data)

    def test_list_communities(self):
        response = self.client.get("/comunidades")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 5)

    def test_filter_communities(self):
        response = self.client.get("/comunidades?municipio_id=1&certificado_fcp=true")
        self.assertEqual(response.status_code, 200)
        self.assertEqual([item["nome"] for item in response.get_json()], ["Quilombo Aurora"])

    def test_list_municipalities(self):
        response = self.client.get("/municipios")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 3)

    def test_list_documents(self):
        response = self.client.get("/documentos")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.get_json()), 2)

    def test_create_community(self):
        database_path = Path("database/mapa_quilombola.db")
        with TemporaryDirectory() as directory:
            temporary_database = Path(directory) / "test.db"
            copyfile(database_path, temporary_database)
            client = create_app(temporary_database).test_client()
            response = client.post(
                "/comunidades",
                json={
                    "nome": "Quilombo Teste da API",
                    "municipio_id": 3,
                    "latitude": -3.9,
                    "longitude": -44.7,
                    "qtd_familias": 12,
                    "certificado_fcp": False,
                },
            )
            self.assertEqual(response.status_code, 201)
            self.assertEqual(len(client.get("/comunidades").get_json()), 6)


if __name__ == "__main__":
    unittest.main()
