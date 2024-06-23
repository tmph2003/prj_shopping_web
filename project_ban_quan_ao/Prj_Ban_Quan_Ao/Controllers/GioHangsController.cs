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
    public class GioHangsController : ControllerBase
    {
        private readonly DbQuanAoContext _context;

        public GioHangsController(DbQuanAoContext context)
        {
            _context = context;
        }

        // GET: api/GioHangs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GioHang>>> GetGioHangs()
        {
            return await _context.GioHangs.ToListAsync();
        }

        // GET: api/GioHangs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GioHang>> GetGioHang(Guid id)
        {
            var gioHang = await _context.GioHangs.FindAsync(id);

            if (gioHang == null)
            {
                return NotFound();
            }

            return gioHang;
        }

        // PUT: api/GioHangs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGioHang(Guid id, GioHang gioHang)
        {
            if (id != gioHang.Id)
            {
                return BadRequest();
            }

            _context.Entry(gioHang).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GioHangExists(id))
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

        // POST: api/GioHangs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GioHang>> PostGioHang(GioHang gioHang)
        {
            _context.GioHangs.Add(gioHang);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGioHang", new { id = gioHang.Id }, gioHang);
        }

        // DELETE: api/GioHangs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGioHang(Guid id)
        {
            var gioHang = await _context.GioHangs.FindAsync(id);
            if (gioHang == null)
            {
                return NotFound();
            }

            _context.GioHangs.Remove(gioHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GioHangExists(Guid id)
        {
            return _context.GioHangs.Any(e => e.Id == id);
        }

        [HttpGet("getslsptronggiobyidaccount/{idAccount}")]
        public IActionResult GetSLSPTrongGioByIdAccount(string idAccount)
        {
            // id giỏ hàng và id account là 1
            var query = from sg in _context.SanPhamGioHangs
                        join sp in _context.SanPhams on sg.SanPhamId equals sp.Id
                        where sg.GioHangId.ToString() == idAccount
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

            return Ok(query.Count());
        }
    }
}
