package br.com.crescer.monitorveiculos.servico;

import br.com.crescer.monitorveiculos.entidade.Camera;
import br.com.crescer.monitorveiculos.entidade.HeatMapModel;
import br.com.crescer.monitorveiculos.entidade.Registro;
import br.com.crescer.monitorveiculos.repositorio.CameraRepositorio;
import br.com.crescer.monitorveiculos.repositorio.RegistroRepositorio;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Diandra Rocha
 */
@Service
public class RegistroServico {

    @Autowired
    RegistroRepositorio registroRepositorio;
    @Autowired
    CameraRepositorio cameraRepositorio;

    private List<Registro> obterRegistrosPorDataHora(Date dataInicial, Date dataFinal) {
        return registroRepositorio.findByDataHoraBetween(dataInicial, dataFinal);
    }

    public List<HeatMapModel> retornoParaHeatMap(Date dataInicial, Date dataFinal) {
        List<HeatMapModel> retorno = new ArrayList<>();

        List<Camera> todasCameras = (List<Camera>) cameraRepositorio.findAll();
        List<Registro> todosRegistros = obterRegistrosPorDataHora(dataInicial, dataFinal);

        long total = todosRegistros.size();

        todasCameras.forEach(camera -> {

            final long count = todosRegistros.stream()
                    .map(Registro::getCamera)
                    .map(Camera::getIdcamera)
                    .filter(camera.getIdcamera()::equals)
                    .count();

            final HeatMapModel heatMapModel = new HeatMapModel(camera, count / total);
            retorno.add(heatMapModel);
        });

        return retorno;
    }
}
