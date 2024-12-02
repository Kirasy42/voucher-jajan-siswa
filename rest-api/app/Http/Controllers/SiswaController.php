<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SiswaController extends Controller
{
    // Get All Resource
    public function index(){
        // Memanggil semua data Siswa
        $siswa = Siswa::all();

        // Melakukan validasi apakah data $siswa kosong
        if ($siswa->isEmpty()){
            $data = [
                "message"=> "Data of Siswa is Empty"
            ];
            $statuscode = 200;
        } else{ 
            $data = [
                "message"=> "Get All Data of Siswa",
                "data"=> $siswa
            ];
            $statuscode = 200;
        }

        return response()->json($data, $statuscode);
    }

    // Add Resource
    public function store(Request $request){

        // Menggunakan Validator untuk memvalidasi data
        $validator = Validator::make($request->all(), [
            'nama_siswa' => 'required|string',
            'foto' => 'nullable|string', // Validasi foto
            'kelas' => 'required|string',
        ]);

        // Melakukan validasi jika $validator tidak sesuai dengan required
        if ($validator -> fails()){
            return response()->json($validator->errors(), 422);
        } else{
            $siswa = Siswa::create($request -> all());
            $data = [
                "message"=> "Data of new Siswa is added successfully",
                "data"=> $siswa
            ];
            $statuscode = 200;
        }

        return response()->json($data, $statuscode);
    }

    // Menampilkan siswa berdasarkan ID
    public function show($id)
    {
        $siswa = Siswa::find($id);
        if (!$siswa) {
            return response()->json(['message' => 'Siswa not found'], 404);
        }
        return response()->json($siswa);
    }

    // Mengupdate data siswa
    public function update(Request $request, $id)
    {
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json(['message' => 'Siswa not found'], 404);
        }

        // Validasi data yang diterima
        $validator = Validator::make($request->all(), [
            'nama_siswa' => 'sometimes|required|string|max:50',
            'foto' => 'nullable|url', // Validasi URL
            'kelas' => 'sometimes|required|string|max:10',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update data siswa
        $siswa->nama_siswa = $request->input('nama_siswa', $siswa->nama_siswa);
        $siswa->foto = $request->input('foto', $siswa->foto); // Simpan URL foto
        $siswa->kelas = $request->input('kelas', $siswa->kelas);
        $siswa->save();

        return response()->json([
            'message' => 'Siswa updated successfully',
            'data' => $siswa,
        ]);
    }

    // Menghapus siswa
    public function destroy($id)
    {
        $siswa = Siswa::find($id);
        if (!$siswa) {
            return response()->json(['message' => 'Siswa not found'], 404);
        }

        $siswa->delete();
        return response()->json(['message' => 'Siswa deleted successfully']);
    }

    // Search Resource by name
    public function search($name){
        $siswa = Siswa::where('nama_siswa', 'like', "%" . $name . "%") -> get();

        if ($siswa -> isEmpty()){
            $data = [
                "message"=> "Resource not found"
            ];
            $statuscode = 404;
        } else{
            $data = [
                "message" => "Get searched Resource",
                "data"=> $siswa,
            ];
            $statuscode = 200;
        }

        return response()->json($data, $statuscode);
    }
}
