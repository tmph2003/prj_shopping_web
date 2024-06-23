using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prj_Ban_Quan_Ao.Models;

namespace Prj_Ban_Quan_Ao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamGioHangsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public SanPhamGioHangsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/SanPhamGioHangs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SanPhamGioHang>>> GetSanPhamGioHangs()
        {
            return await _context.SanPhamGioHangs.ToListAsync();
        }

        // GET: api/SanPhamGioHangs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhamGioHang>> GetSanPhamGioHang(Guid id)
        {
            var sanPhamGioHang = await _context.SanPhamGioHangs.FindAsync(id);

            if (sanPhamGioHang == null)
            {
                return NotFound();
            }

            return sanPhamGioHang;
        }

        // PUT: api/SanPhamGioHangs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPhamGioHang(Guid id, SanPhamGioHang sanPhamGioHang)
        {
            if (id != sanPhamGioHang.Id)
            {
                return BadRequest();
            }

            _context.Entry(sanPhamGioHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamGioHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SanPhamGioHangs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPhamGioHang>> PostSanPhamGioHang(SanPhamGioHang sanPhamGioHang)
        {
            try
            {
                _context.SanPhamGioHangs.Add(sanPhamGioHang);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetSanPhamGioHang", new { id = sanPhamGioHang.Id, status = "success" }, sanPhamGioHang);
            }
            catch(Exception e)
            {
                return Ok(new { status = "error" });
            }
        }

        // DELETE: api/SanPhamGioHangs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPhamGioHang(Guid id)
        {
            var sanPhamGioHang = await _context.SanPhamGioHangs.FindAsync(id);
            if (sanPhamGioHang == null)
            {
                return NotFound();
            }

            _context.SanPhamGioHangs.Remove(sanPhamGioHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpGet("getsanphamtronggiohang/{idGioHang}")]
        public IActionResult GetSanPhamTrongGioHang(string idGioHang)
        {
            var query = from sg in _context.SanPhamGioHangs
                        join sp in _context.SanPhams on sg.SanPhamId equals sp.Id
                        where sg.GioHangId.ToString() == idGioHang
                        group new { sg, sp } by new { sg.SanPhamId, sg.GioHangId, sg.Mau, sp.Ten, sp.Gia, sp.GiaSauGiam, sp.DuongDanAnh, sg.KichCo } into grouped
                        select new
                        {
                            SanPham_id = grouped.Key.SanPhamId,
                            GioHang_id = grouped.Key.GioHangId,
                            soLuong = grouped.Sum(x => x.sg.SoLuong),
                            kichCo = grouped.Key.KichCo,
                            mau = grouped.Key.Mau,
                            ten = grouped.Key.Ten,
                            gia = grouped.Key.Gia,
                            giaSauGiam = grouped.Key.GiaSauGiam,
                            duongDanAnh = grouped.Key.DuongDanAnh
                        };
            return Ok(query);
        }

        [HttpDelete("xoamotsanphamtronggiohang/{idGioHang}/{idSanPham}/{kichCo}/{mau}")]
        public async Task<IActionResult> XoaMotSanPhamTrongGioHang(string idGioHang, string idSanPham, double kichCo, int mau)
        {
            var sanPhamTrongGio = await _context.SanPhamGioHangs
                .Where(s => s.GioHangId.ToString() == idGioHang 
                && s.SanPhamId.ToString() == idSanPham
                && s.KichCo == kichCo
                && s.Mau == mau
                ).ToListAsync();
            if (sanPhamTrongGio == null || sanPhamTrongGio.Count == 0)
            {
                return NotFound();
            }

            _context.SanPhamGioHangs.RemoveRange(sanPhamTrongGio);
            await _context.SaveChangesAsync();
            return Ok(NoContent());
        }

        [HttpDelete("xoasanphamtronggiohang/{idGioHang}")]
        public async Task<IActionResult> XoaSanPhamTrongGioHang(string idGioHang)
        {
            var sanPhamTrongGio = await _context.SanPhamGioHangs
                .Where(s => s.GioHangId.ToString() == idGioHang)
                .ToListAsync();
            if (sanPhamTrongGio == null || sanPhamTrongGio.Count == 0)
            {
                return NotFound();
            }

            _context.SanPhamGioHangs.RemoveRange(sanPhamTrongGio);
            await _context.SaveChangesAsync();
            return Ok(NoContent());
        }

        private bool SanPhamGioHangExists(Guid id)
        {
            return _context.SanPhamGioHangs.Any(e => e.Id == id);
        }
    }
}
